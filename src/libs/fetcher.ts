import { BASE_URL } from "@/constants/api"

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {

  const isFormData = options?.body instanceof FormData;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: 'include',
    ...options,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}