import { apiFetch } from "@/libs/fetcher"
import { LoginPayload, RegisterPayload } from "@/types/payload"


export const authService = {
  login: (data: LoginPayload) =>
    apiFetch('/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  register: (data: RegisterPayload) =>
    apiFetch('/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  forgotPassword: (email: string) =>
    apiFetch('/users/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  logout: () =>
    apiFetch('/users/logout', {
      method: 'POST',
    }),
}