// server.js
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY'); // Replace with your real secret key

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body;

  const lineItems = cartItems.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: [item.image],
      },
      unit_amount: parseInt(item.price * 100), // Stripe uses cents
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'https://yourdomain.com/success',
      cancel_url: 'https://yourdomain.com/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to create checkout session' });
  }
});

app.listen(4242, () => console.log('Server is running on port 4242'));
