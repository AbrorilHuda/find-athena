export default async function handler(req, res) {
  const targetPath = req.url.replace(/^\/api\/athena/, "");
  const targetUrl = `https://apiathena.unira.ac.id/api${targetPath}`;

  const headers = new Headers();

  // Copy header dari client
  Object.entries(req.headers).forEach(([key, value]) => {
    if (!["host", "origin", "referer"].includes(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  // Spoofing header
  headers.set("Origin", "https://unira.ac.id");
  headers.set("Referer", "https://unira.ac.id/");
  headers.set("Host", "apiathena.unira.ac.id");

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body:
        req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    });

    // CORS untuk browser
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );

    res.status(response.status);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy error", message: error.message });
  }
}
