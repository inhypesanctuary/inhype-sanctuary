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

async function sendPurchaseNotification({ planName, amount, firstName, lastName, email, phone, address1, city, state, zip, subscriptionId }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set, skipping purchase notification email.');
    return;
  }
  const when = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', dateStyle: 'medium', timeStyle: 'short' });
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
  const dayOfMonth = Math.min(new Date().getDate(), 28);

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
      await sendPurchaseNotification({
        planName: PLAN_NAMES[plan],
        amount,
        firstName, lastName, email, phone, address1, city, state, zip,
        subscriptionId,
      });

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
