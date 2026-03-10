import type {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "@/types/payload";

import { apiFetch } from "@/libs/fetcher";

export const authService = {
  login: (data: LoginPayload) =>
    apiFetch("/users/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  register: (data: RegisterPayload) =>
    apiFetch("/users/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  forgotPassword: (data: ForgotPasswordPayload) =>
    apiFetch("/users/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  resetPassword: (data: ResetPasswordPayload) =>
    apiFetch("/users/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () =>
    apiFetch("/users/logout", {
      method: "POST",
    }),
};
