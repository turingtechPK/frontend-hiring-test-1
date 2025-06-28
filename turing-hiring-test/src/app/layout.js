import { Inter } from "next/font/google";
import AuthWrapper from "@/components/AuthWrapper";
import { AppProviders } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Call Center App",
  description: "A call center application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>
          <AuthWrapper>{children}</AuthWrapper>
        </AppProviders>
      </body>
    </html>
  );
}
