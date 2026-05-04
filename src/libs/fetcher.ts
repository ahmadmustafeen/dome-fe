import { BASE_URL } from "@/constants/api";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const isFormData = options?.body instanceof FormData;

  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const response = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options?.headers,
    },
  });

  // Guard against HTML error pages (e.g. Express default 500 handler).
  // Only attempt JSON parsing when the server says it's JSON.
  const contentType = response.headers.get("content-type") ?? "";
  const data: unknown = contentType.includes("application/json")
    ? await response.json()
    : { message: await response.text() };

  if (!response.ok) {
    const message =
      (data as { message?: string }).message ||
      `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data as T;
}
