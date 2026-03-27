export default async function handler(req, res) {
  // ✅ CORS 設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // ✅ OPTIONS 預檢
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body;

    // 可在這裡清理 JSON
    const cleaned = data; // 範例先保留原本 JSON

    console.log('Sending to n8n:', JSON.stringify(cleaned));

    const webhookResp = await fetch('https://hcrmeapi.hic.com.tw/webhook/format-conversion', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'cb557d70-6b1d-4402-ae1e-e62e5010bfd8'
      },
      body: JSON.stringify(cleaned),
    });

    const result = await webhookResp.json();
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
