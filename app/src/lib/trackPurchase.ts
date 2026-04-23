export async function trackPurchase(params?: {
  email?: string;
  value?: number;
  currency?: string;
}) {
  try {
    await fetch('/api/track-purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: params?.email,
        value: params?.value ?? 27,
        currency: params?.currency ?? 'USD',
        eventSourceUrl: window.location.href,
        userAgent: navigator.userAgent,
      }),
    });
  } catch {
    // Non-blocking — never let tracking errors affect UX
  }
}
