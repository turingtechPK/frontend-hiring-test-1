import "@/styles/globals.css";
import AppLayout from "@/components/layout/AppLayout";

export default function App({ Component, pageProps }) {
  return (
    <AppLayout>
      <main>
        <Component {...pageProps} />
      </main>
    </AppLayout>
  );
}
