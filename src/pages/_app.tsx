import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../components/common/Footer";
import Nav from "../components/common/Nav";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
