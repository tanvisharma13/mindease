
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const apiRequest = async (
  endpoint,
  { method = "GET", body, headers = {} } = {}
) => {
  const token = localStorage.getItem("mindease_token");

  const requestHeaders = {
    ...headers,
  };

  if (body !== undefined) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: requestHeaders,
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.message || `Request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Unable to connect to MindEase server. Please check whether the backend is running."
      );
    }

    throw error;
  }
};
