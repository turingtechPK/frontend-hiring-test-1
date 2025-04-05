import type { Metadata } from "next";
import { AuthProvider } from "../contexts/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Turing Tech Frontend Task",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-['Avenir'] text-black">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
