import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import ClientThemeProvider from "./components/ClientThemeProvider";
import { AuthProvider } from "@/lib/auth-context";
import { PusherProvider } from "@/lib/pusher";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "TuringTech - Frontend Test",
  description: "Call management system for TuringTech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link
          href="https://fonts.cdnfonts.com/css/avenir-lt-std"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <PusherProvider>
            <ClientThemeProvider>
              <Header />
              {children}
            </ClientThemeProvider>
          </PusherProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
