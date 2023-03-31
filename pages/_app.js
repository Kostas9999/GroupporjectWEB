import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { createTheme, Link, styled } from "@nextui-org/react";
import { SSRProvider } from "@react-aria/ssr";

function MyApp({ Component, pageProps }) {
  <SSRProvider>
    <NextUIProvider theme={{ type: "dark" }}></NextUIProvider>;
  </SSRProvider>;
  return <Component {...pageProps} />;
}

export default MyApp;
