import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { trackPurchase } from './lib/trackPurchase'

// Fire Meta Conversions API event when Gumroad checkout succeeds
window.addEventListener('message', (e) => {
  if (e.data?.event === 'Checkout.Success') {
    const email = e.data?.data?.order?.userEmail as string | undefined;
    const value = e.data?.data?.order?.subtotal
      ? e.data.data.order.subtotal / 100
      : 27;
    trackPurchase({ email, value });
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
