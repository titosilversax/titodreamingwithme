const crypto = require('crypto');

const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

function sha256(value) {
  return crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://titodreamingwith.me');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, value, currency, eventSourceUrl, clientIp, userAgent } = req.body || {};

  const userData = {
    client_ip_address: clientIp || req.headers['x-forwarded-for'] || '',
    client_user_agent: userAgent || req.headers['user-agent'] || '',
  };
  if (email) userData.em = [sha256(email)];

  const payload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: eventSourceUrl || 'https://titodreamingwith.me',
        user_data: userData,
        custom_data: {
          value: value ?? 17,
          currency: currency || 'USD',
          content_name: 'The Emotional Star Map',
          content_type: 'product',
        },
      },
    ],
    test_event_code: process.env.META_TEST_EVENT_CODE || undefined,
  };

  // Remove test_event_code if not set
  if (!payload.test_event_code) delete payload.test_event_code;

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    const result = await response.json();
    return res.status(response.ok ? 200 : 400).json(result);
  } catch (err) {
    console.error('Meta CAPI error:', err);
    return res.status(500).json({ error: 'Failed to send event to Meta' });
  }
};
