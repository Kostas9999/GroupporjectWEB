import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";

function MyApp({ Component, pageProps }) {
  <NextUIProvider></NextUIProvider>;
  return <Component {...pageProps} />;
}

export default MyApp;
