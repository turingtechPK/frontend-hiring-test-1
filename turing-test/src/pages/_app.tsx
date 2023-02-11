import { AuthContext } from "@/contexts/auth-context";
import { User } from "@/hooks/use-user";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
