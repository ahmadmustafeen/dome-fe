export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  password: string
}


export interface ClientPayload {
  name: string
  email: string
  phone: string
  address: string
}

export interface SitePayload {
  clientId: string
  name: string
  timeline: string
  startDate: string
  address: string
}