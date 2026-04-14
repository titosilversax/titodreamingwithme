import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { trackPurchase } from './lib/trackPurchase'

// Fire Meta Conversions API event when LemonSqueezy checkout succeeds
window.addEventListener('message', (e) => {
  if (e.data?.event === 'Checkout.Success') {
    const email = e.data?.data?.order?.userEmail as string | undefined;
    const value = e.data?.data?.order?.subtotal
      ? e.data.data.order.subtotal / 100
      : 17;
    trackPurchase({ email, value });
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
