// NMI (Cashnet Solutions gateway) recurring subscription checkout.
// Docs: https://support.nmi.com/hc/en-gb/articles/14525725002385-API-Recurring-Payments-and-Subscriptions
//       https://docs.nmi.com/docs/quick-start-tutorial

const PLAN_PRICES = {
  core: '399.00',
  plus: '499.00',
  elite: '899.00',
};

const PLAN_NAMES = {
  core: 'Sanctuary Core',
  plus: 'Sanctuary Plus',
  elite: 'Sanctuary Elite',
};

const NOTIFY_EMAIL = 'inhype.sanctuary@icloud.com';

async function sendPurchaseNotification({ planName, amount, firstName, lastName, email, phone, address1, city, state, zip, subscriptionId, nextBillingDate }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set, skipping purchase notification email.');
    return;
  }
  const when = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', dateStyle: 'medium', timeStyle: 'short' });
  const renewsOn = nextBillingDate.toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles', dateStyle: 'long' });
  const html = `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;">
      <h2 style="color:#0f1a17;">New Membership Purchase</h2>
      <p><strong>${planName}</strong> — $${amount}/mo</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:4px 0;color:#666;">Name</td><td>${firstName} ${lastName}</td></tr>
        <tr><td style="padding:4px 0;color:#666;">Email</td><td>${email}</td></tr>
        <tr><td style="padding:4px 0;color:#666;">Phone</td><td>${phone || '—'}</td></tr>
        <tr><td style="padding:4px 0;color:#666;">Address</td><td>${[address1, city, state, zip].filter(Boolean).join(', ') || '—'}</td></tr>
        <tr><td style="padding:4px 0;color:#666;">Subscription ID</td><td>${subscriptionId || '—'}</td></tr>
        <tr><td style="padding:4px 0;color:#666;">Purchased</td><td>${when} (PT)</td></tr>
        <tr><td style="padding:4px 0;color:#666;">Subscription renews on</td><td><strong>${renewsOn}</strong>, then monthly on the same day</td></tr>
      </table>
      <p style="margin-top:1.5rem;font-size:12px;color:#999;">Full transaction and billing history is available in your Cashnet/NMI gateway dashboard.</p>
    </div>
  `;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'InHype Sanctuary <onboarding@resend.dev>',
        to: NOTIFY_EMAIL,
        subject: `New purchase: ${planName} — ${firstName} ${lastName}`,
        html,
      }),
    });
  } catch (err) {
    console.error('Failed to send purchase notification email:', err);
  }
}

async function sendCustomerConfirmation({ planName, amount, firstName, email, nextBillingDate }) {
  if (!process.env.RESEND_API_KEY) return;
  const renewsOn = nextBillingDate.toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles', dateStyle: 'long' });
  const html = `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#0f1a17;color:#f7f5f0;padding:2.5rem 2rem;border-radius:12px;">
      <p style="text-align:center;color:#c9a84c;font-size:1.5rem;margin-bottom:0.5rem;">&#10022;</p>
      <h1 style="text-align:center;font-family:Georgia,serif;font-style:italic;font-weight:400;color:#f7f5f0;font-size:1.7rem;margin-bottom:1rem;">Welcome to the Sanctuary</h1>
      <p style="text-align:center;color:rgba(247,245,240,0.6);font-size:0.9rem;line-height:1.7;">
        Hi ${firstName}, your <strong style="color:#c9a84c;">${planName}</strong> membership ($${amount}/mo) has been confirmed.
        Our team will reach out within 24 hours to schedule your complimentary consultation.
      </p>
      <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:1.25rem 1.5rem;margin:1.75rem 0;font-size:0.85rem;">
        <p style="color:#c9a84c;margin-bottom:0.5rem;">Next steps</p>
        <p style="color:rgba(247,245,240,0.7);line-height:1.8;margin:0;">
          1. We'll call you to schedule your consultation<br/>
          2. Bloodwork &rarr; MD approval &rarr; treatment begins<br/>
          3. Your membership renews monthly, next charge on <strong>${renewsOn}</strong>
        </p>
      </div>
      <p style="text-align:center;color:rgba(247,245,240,0.4);font-size:0.8rem;">
        Questions? Call us at <a href="tel:2093300033" style="color:#c9a84c;text-decoration:none;">(209) 330-0033</a>
      </p>
    </div>
  `;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'InHype Sanctuary <onboarding@resend.dev>',
        to: email,
        subject: `Welcome to InHype Sanctuary — ${planName} confirmed`,
        html,
      }),
    });
  } catch (err) {
    console.error('Failed to send customer confirmation email:', err);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const {
    plan, token,
    firstName, lastName, email, phone,
    address1, city, state, zip,
  } = req.body || {};

  const amount = PLAN_PRICES[plan];
  if (!amount) {
    return res.status(400).json({ success: false, message: 'Invalid plan selected.' });
  }
  if (!token) {
    return res.status(400).json({ success: false, message: 'Missing payment token.' });
  }
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ success: false, message: 'Please fill in your name and email.' });
  }
  if (!process.env.NMI_SECURITY_KEY) {
    console.error('NMI_SECURITY_KEY is not set');
    return res.status(500).json({ success: false, message: 'Payments are not configured yet. Please call us at (209) 330-0033.' });
  }

  // Bill on the same day each month; clamp to 28 so it's valid in every month.
  const today = new Date();
  const dayOfMonth = Math.min(today.getDate(), 28);
  // First payment happens now (this request); the recurring schedule kicks in
  // one calendar month from today, on that same day.
  const nextBillingDate = new Date(today.getFullYear(), today.getMonth() + 1, dayOfMonth);

  const params = new URLSearchParams({
    security_key: process.env.NMI_SECURITY_KEY,
    payment_token: token,
    recurring: 'add_subscription',
    plan_payments: '0', // 0 = bills monthly until cancelled (6-month minimum term is enforced by policy, not the gateway)
    plan_amount: amount,
    month_frequency: '1',
    day_of_month: String(dayOfMonth),
    first_name: firstName,
    last_name: lastName,
    email,
    phone: phone || '',
    address1: address1 || '',
    city: city || '',
    state: state || '',
    zip: zip || '',
  });

  try {
    const nmiRes = await fetch('https://secure.nmi.com/api/transact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    const text = await nmiRes.text();
    const result = Object.fromEntries(new URLSearchParams(text));

    if (result.response === '1') {
      const subscriptionId = result.subscription_id || result.transactionid || null;

      // Awaited (not fire-and-forget) — on serverless the function can be frozen
      // right after the response is sent, which would kill an un-awaited fetch.
      await Promise.all([
        sendPurchaseNotification({
          planName: PLAN_NAMES[plan],
          amount,
          firstName, lastName, email, phone, address1, city, state, zip,
          subscriptionId,
          nextBillingDate,
        }),
        sendCustomerConfirmation({
          planName: PLAN_NAMES[plan],
          amount,
          firstName,
          email,
          nextBillingDate,
        }),
      ]);

      return res.status(200).json({
        success: true,
        subscriptionId,
      });
    }

    return res.status(200).json({
      success: false,
      message: result.responsetext || 'Your card could not be processed. Please check your details and try again.',
    });
  } catch (err) {
    console.error('NMI checkout error:', err);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please call us at (209) 330-0033.',
    });
  }
}
