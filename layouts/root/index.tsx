"use client";

//types
import type { ReactNode } from "react";
import type { Theme } from "@mui/material/styles";

// next
import Head from "next/head";

// @mui
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// redux
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@store";

//other
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";

// components
import { Toaster } from "@components";
import { createTheme } from "@theme";

interface LayoutProps {
  children: ReactNode;
  settings?: Settings;
}

const persistor = persistStore(store);

const theme: Theme = createTheme({
  direction: "ltr",
  responsiveFontSizes: false,
  colorPreset: "indigo",
  contrast: "normal",
  paletteMode: "light",
});

export function RootLayout(props: LayoutProps): JSX.Element {
  const { children, settings } = props;

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Head>
              <meta name="color-scheme" content={theme?.paletteMode} />
              <meta name="theme-color" content={theme.palette.neutral[900]} />
            </Head>
            <CssBaseline />
            {children}
            <Toaster />
          </ThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
