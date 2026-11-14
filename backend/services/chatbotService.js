
const FASTAPI_URL =
  process.env.FASTAPI_URL || "http://127.0.0.1:8000";

const generateChatResponse = async (message, history = []) => {
  const response = await fetch(`${FASTAPI_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      history,
    }),
    signal: AbortSignal.timeout(120000),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `FastAPI request failed (${response.status}): ${errorText}`
    );
  }

  if (!response.body) {
    throw new Error("FastAPI returned an empty response stream");
  }

  return response;
};

module.exports = {
  generateChatResponse,
};
