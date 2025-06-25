// src/stripe.js
import { loadStripe } from '@stripe/stripe-js';

// This reads VITE_STRIPE_PUBLISHABLE_KEY from your .env.local
export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);
