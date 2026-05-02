import { env } from "@/lib/config/env";
import { tokenManager } from "./tokenManager";

type RequestOptions = RequestInit & { _retry?: boolean };

async function authFetch(
  path: string,
  options: RequestOptions = {},
): Promise<Response> {
  const token = tokenManager.get();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${env.API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers,
  });

  // Token expired — try to refresh once and retry the original request
  if (res.status === 401 && !options._retry) {
    const newToken = await tokenManager.refresh();
    if (newToken) {
      return authFetch(path, { ...options, _retry: true });
    }
  }

  return res;
}

async function parseResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data as T;
}

export { authFetch, parseResponse };
