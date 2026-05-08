import { apiFetch } from "@/libs/fetcher";
import type { ClientPayload } from "@/types/payload";

export const clientService = {
  getAllClient: () =>
    apiFetch("/clients", {
      method: "GET",
    }),

  createClient: (data: ClientPayload) =>
    apiFetch("/clients", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getClientById: (id: string) =>
    apiFetch(`/clients/${id}`, {
      method: "GET",
    }),

  updateClient: (id: string, data: ClientPayload) =>
    apiFetch(`/clients/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteClient: (id: string) =>
    apiFetch(`/clients/${id}`, {
      method: "DELETE",
    }),
};
