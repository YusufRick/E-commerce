// api/create-checkout-session.js
import Stripe from 'stripe'
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY, 
  { apiVersion: '2022-11-15' }
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const { items } = req.body
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'No items provided' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map(i => ({
        price:    i.price,     // must be your Stripe Price ID string
        quantity: i.quantity || 1,
      })),
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${req.headers.origin}/cart`,

      shipping_address_collection: {
      allowed_countries: ['MY'],
      },

  // ✅ Enable phone number field
      phone_number_collection: {
      enabled: true,
      },
    })
    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('🛑 Stripe session creation error:', err)
    return res
      .status(500)
      .json({ error: 'Stripe session creation failed' })
  }
}
