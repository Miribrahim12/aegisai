export async function analyzeLog(payload) {
  const res = await fetch(
    "https://aegisai-dmi3.onrender.com/analyze",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error("Scan failed");
  }

  return await res.json();
}
