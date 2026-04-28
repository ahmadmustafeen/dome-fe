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
  address1: string
  address2: string
  state: string
  country: string
  zipCode: string
  city: string

}

export interface SitePayload {
  clientId: string
  name: string
  timeline: string
  startDate: string
  address1: string
  address2: string
  country: string
  city: string
  zipCode: string
  state: string
}

export interface AssetPayload {
  siteId: string;
  assetId: string;
  assetName: string;
  category: string;
  subCategory: string;
  make: string;
  modelName: string;
  location?: string;
  serialNumber?: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}