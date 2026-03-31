"use client";

import { createContext, useContext, useMemo, useState } from "react";

type PrototypeUser = { name: string; email: string } | null;
type PrototypeAuthContextValue = {
  user: PrototypeUser;
  login: (params: { name: string; email: string }) => void;
  logout: () => void;
};

const PrototypeAuthContext = createContext<PrototypeAuthContextValue | null>(null);

export function PrototypeAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PrototypeUser>(null);
  const value = useMemo(
    () => ({
      user,
      login: ({ name, email }: { name: string; email: string }) => setUser({ name, email }),
      logout: () => setUser(null),
    }),
    [user],
  );
  return <PrototypeAuthContext.Provider value={value}>{children}</PrototypeAuthContext.Provider>;
}

export function usePrototypeAuth() {
  const ctx = useContext(PrototypeAuthContext);
  if (!ctx) throw new Error("usePrototypeAuth must be used within provider");
  return ctx;
}
