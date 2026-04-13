import { loadWebEnv } from "@repo/config";

export async function proxyAdminApi(path: string, init?: RequestInit) {
  const env = loadWebEnv();
  const url = new URL(path, env.ADMIN_API_BASE_URL);

  return fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });
}
