import axios from "axios";

export function getServerUrl() {
  const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  return SERVER_URL;
}

export async function bootupBackend() {
  if (sessionStorage.getItem("backend_warmed")) return;

  try {
    const SERVER_URL = getServerUrl();
    await axios.get(`${SERVER_URL}/health/ping`);
    sessionStorage.setItem("backend_warmed", "true");
  } catch {}
}
