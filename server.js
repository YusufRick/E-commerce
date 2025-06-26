// server.js
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const Stripe  = require('stripe');

// load your secret key from .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
});

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'No items provided' });
  }

  // build Stripe line_items
  const line_items = items.map(i => ({
    price_data: {
      currency: 'usd',            // ← change to your currency
      product_data: { name: i.name },
      unit_amount: Math.round(i.price * 100), // dollars → cents
    },
    quantity: i.quantity || 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${req.headers.origin}/cart`,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe session creation error:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 4242;
app.listen(PORT, () => console.log(`⚡ Stripe server listening on ${PORT}`));
