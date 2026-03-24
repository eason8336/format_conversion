export default async function handler(req, res) {
  try {
    const response = await fetch('https://hcrmeapi.hic.com.tw/webhook-test/format-conversion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'cb557d70-6b1d-4402-ae1e-e62e5010bfd8'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}
