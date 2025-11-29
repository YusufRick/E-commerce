// src/components/Cart.jsx
import React, { useContext, useState } from 'react'
import { CartContext }                 from '../context/CartContext'

export default function Cart({ isOpen, onClose }) {
  const { cartItems, removeFromCart, cartTotal } = useContext(CartContext)
  const [loading, setLoading] = useState(false)

  const handleBuy = async () => {
    if (!cartItems.length) return
    setLoading(true)

    const items = cartItems.map(item => {
      if (!item.priceId) {
        console.error('❌ Missing priceId for', item)
      }
      return {
        price:    item.priceId,          // your Stripe Price ID
        quantity: item.quantity || 1,
        size:    item.size || null, // optional, if you have sizes 
        name:    item.name,             // product name
        
      }
    })

    console.log('👉 POST /api/create-checkout-session', items)

    try {
      const res = await fetch('/api/create-checkout-session', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ items }),
      })

      // 1) HTTP‐level check
      if (!res.ok) {
        let errPayload = {}
        try { errPayload = await res.json() } catch {}
        throw new Error(errPayload.error || `HTTP ${res.status}`)
      }

      // 2) parse JSON
      const { url, error } = await res.json()
      if (error) throw new Error(error)

      // 3) redirect
      window.location.href = url
    } catch (err) {
      console.error('❌ Error creating checkout session:', err)
      alert('Checkout failed: ' + err.message)
      setLoading(false)
    }
  }

  const totalQuantity = cartItems.reduce((sum, i) => sum + (i.quantity||1), 0)

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>Your Cart ({totalQuantity})</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, i) => (
              <li key={i}>
                <div className="cart-item-info">
                  <p>{item.name}</p>
                  {item.size && <p>Size: {item.size}</p>}
                  <p>Qty: {item.quantity}</p>
                  <p>Price: RM{item.price.toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id, item.size)}>
  Remove
</button>

                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <strong>Total:</strong> RM{cartTotal.toFixed(2)}
          </div>
        </>
      )}

      <button
        className="checkout-btn"
        onClick={handleBuy}
        disabled={loading || cartItems.length === 0}
      >
        {loading ? 'Redirecting…' : 'Checkout'}
      </button>
    </div>
  )
}
