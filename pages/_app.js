import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import {
  createTheme,
  Link,
  styled,

} from "@nextui-org/react";



function MyApp({ Component, pageProps }) {
  <NextUIProvider theme={{type:"dark"}}></NextUIProvider>;
  return <Component {...pageProps} />;
}

export default MyApp;
