import { Site } from "@/components"
import { apiFetch } from "@/libs/fetcher"
import { SitePayload } from "@/types/payload"


export const siteService = {
  getAllSites: (params?: Record<string, string>) =>
    apiFetch<Site[]>(`/sites${params ? `?${new URLSearchParams(params)}` : ''}`, {
      method: 'GET',
    }),

  createSite: (data: SitePayload) =>
    apiFetch('/sites', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getSiteById: (id: string) =>
    apiFetch(`/sites/${id}`, {
      method: 'GET',
    }),

  updateSite: (id: string, data: SitePayload) =>
    apiFetch(`/sites/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteSite: (id: string) =>
    apiFetch(`/sites/${id}`, {
      method: 'DELETE',
    }),
}