// api/clean.js
export default async function handler(req, res) {
  // 允許前端任何來源呼叫
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 如果是 OPTIONS 預檢請求，直接回應 200
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body; // 前端送過來的 JSON

    // 這裡可以先整理 JSON，例如去掉空值、重複欄位
    // 範例簡單保留原本 JSON
    const cleaned = data;

    // 呼叫 n8n Webhook
    const webhookResp = await fetch('https://hcrmeapi.hic.com.tw/webhook/format-conversion', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'cb557d70-6b1d-4402-ae1e-e62e5010bfd8'
      },
      body: JSON.stringify(cleaned),
    });

    const result = await webhookResp.json(); // n8n 回傳的資料

    // 回傳給前端
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
