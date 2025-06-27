// server.js
import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

const app    = express()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

app.use(cors())
app.use(express.json())

app.post('/api/create-checkout-session', async (req, res) => {
  const { items } = req.body

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'No items provided' })
  }

  // We assume each item has { price: 'price_xxx', quantity: n }
  const line_items = items.map(i => ({
    price:    i.price,        // your Stripe Price ID
    quantity: i.quantity || 1
  }))

  try {
    const session = await stripe.checkout.sessions.create({
      mode:        'payment',
      payment_method_types: ['card'],
      line_items,
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${req.headers.origin}/`,
    })
    res.json({ url: session.url })
  } catch (err) {
    console.error('🛑 stripe.checkout.sessions.create failed:', err)
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 4242
app.listen(PORT, () => {
  console.log(`⚡️ Stripe server listening on http://localhost:${PORT}`)
  console.log(`🔒 STRIPE_SECRET_KEY is ${process.env.STRIPE_SECRET_KEY?.slice(0,10)}…`)
})
