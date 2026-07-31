// NMI (Cashnet Solutions gateway) recurring subscription checkout.
// Docs: https://support.nmi.com/hc/en-gb/articles/14525725002385-API-Recurring-Payments-and-Subscriptions
//       https://docs.nmi.com/docs/quick-start-tutorial

const PLAN_PRICES = {
  core: '399.00',
  plus: '499.00',
  elite: '899.00',
};

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
      return res.status(200).json({
        success: true,
        subscriptionId: result.subscription_id || result.transactionid || null,
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
