import type { ReactNode } from "react";
import type { Metadata } from "next";

import { NProgress } from "@components";
import { RootLayout } from "@layouts/root";

// google fonts
import { Open_Sans as openSansFunc } from "next/font/google";

// Force-Dynamic is required otherwise all pages are marked as client-side
// due to the usage of the "cookies" function.
export const dynamic = "force-dynamic";

// fonts
const openSans = openSansFunc({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Turing Test",
  description: "Turing Test Technology",
  viewport: "initial-scale=1, width=device-width",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico", type: "image/x-icon" },
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
  },
};

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps): JSX.Element {
  const { children } = props;

  return (
    <html lang="en">
      <body className={`${openSans.className}`}>
        <RootLayout>
          {children} <NProgress />
        </RootLayout>
      </body>
    </html>
  );
}

export default Layout;
