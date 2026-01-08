export default async function handler(req, res) {
  try {
    // Allow CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Preflight request
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    // Query params forward karo
    const query = new URLSearchParams(req.query).toString();

    const apiResponse = await fetch(
      `https://danger-change-nickname.vercel.app/change-name?${query}`
    );

    const data = await apiResponse.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Proxy backend error",
      error: error.message
    });
  }
}