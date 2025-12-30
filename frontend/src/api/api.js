// =========================
// JSON BASED SCAN (BUTTON)
// =========================
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

// =========================
// CSV UPLOAD SCAN
// =========================
export async function analyzeCSV(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    "https://aegisai-dmi3.onrender.com/analyze-csv",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("CSV analysis failed");
  }

  return await res.json();
}
