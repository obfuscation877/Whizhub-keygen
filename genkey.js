exports.handler = async function(event, context) {
  const SUPABASE_URL = "https://bojasnflpqqdnzeszouw.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvamFzbmZscHFxZG56ZXN6b3V3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MzExMTQsImV4cCI6MjA5NDAwNzExNH0.O0gs9rOrx1ogAHMqBPQOCmX_hBU8GcNL0h6pRbQg7FY";

  // Generate a random key like WHIZ-A1B2-C3D4-E5F6
  function generateKey() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const seg = () => Array.from({length: 4}, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    return `WHIZ-${seg()}-${seg()}-${seg()}`;
  }

  const key = generateKey();

  // Save the key to Supabase
  const response = await fetch(`${SUPABASE_URL}/rest/v1/keys`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": "Bearer " + SUPABASE_KEY,
      "Content-Type": "application/json",
      "Prefer": "return=minimal"
    },
    body: JSON.stringify({ key: key, used: false })
  });

  if (!response.ok) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to save key" })
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: key })
  };
};
