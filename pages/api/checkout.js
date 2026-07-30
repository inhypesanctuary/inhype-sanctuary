import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  core: process.env.STRIPE_PRICE_CORE,
  plus: process.env.STRIPE_PRICE_PLUS,
  elite: process.env.STRIPE_PRICE_ELITE,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plan } = req.body;
  const priceId = PRICE_IDS[plan];

  if (!priceId) {
    return res.status(400).json({ error: 'Invalid plan' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/#membership`,
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      custom_text: {
        submit: {
          message: 'Your membership begins after your complimentary consultation and MD approval.',
        },
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
