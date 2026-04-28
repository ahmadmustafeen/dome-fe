"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface Site {
  _id: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  startDate: string;
  timeline: string;
}

export interface Client {
  _id: string;
  name: string;
  address2: string;
  address1: string;
  city: string;
  country: string;
  state: string;
  phone: string;
  email: string;
}

interface AppContextType {
  site: Site | null;
  client: Client | null;
  setSite: (site: Site | null) => void;
  setClient: (client: Client | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [site, setSite] = useState<Site | null>(null);
  const [client, setClient] = useState<Client | null>(null);

  // Load from localStorage on first mount
  useEffect(() => {
    const storedSite = localStorage.getItem("site");
    const storedClient = localStorage.getItem("client");

    if (storedSite) setSite(JSON.parse(storedSite));
    if (storedClient) setClient(JSON.parse(storedClient));
  }, []);

  // Save when changed
  useEffect(() => {
    if (site) {
      localStorage.setItem("site", JSON.stringify(site));
    } else {
      localStorage.removeItem("site");
    }
  }, [site]);

  useEffect(() => {
    if (client) {
      localStorage.setItem("client", JSON.stringify(client));
    } else {
      localStorage.removeItem("client");
    }
  }, [client]);

  return (
    <AppContext.Provider value={{ site, client, setSite, setClient }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used inside AppProvider");
  return context;
};