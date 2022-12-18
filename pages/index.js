import Head from "next/head";
import Navbar from "./templates/navbar/navbar";
//import Navbar2 from "./templates/navbar/navbar2";
import styles from "../styles/Home.module.css";
import { NextUIProvider } from "@nextui-org/react";
import {
  Button,
  Text,
  Modal,
  Input,
  Grid,
  styled,
  Spacer,
} from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <div className={styles.container}>
        <Navbar />
        <Head>
          <title>NetMon</title>
          <meta name="description" content="Monitoring Tool" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Text
            size={70}
            css={{
              textGradient: "45deg, $black -20%, $blue600 80%",
            }}
          >
            Monitoring Tool
          </Text>

          <script
            type="module"
            src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
          ></script>

          <div className={styles.grid}></div>
        </main>
        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Vercel
          </a>
        </footer>
      </div>
    </NextUIProvider>
  );
}
