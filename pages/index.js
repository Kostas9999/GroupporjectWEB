import Navbar from "./templates/navbar/navbar";
import Header from "./templates/header";
import Footer from "./templates/footer";

import styles from "../styles/Home.module.css";
import { NextUIProvider } from "@nextui-org/react";
import { Text } from "@nextui-org/react";

export default function Home() {
  console.log(process.env.NODE_ENV);
  return (
    <NextUIProvider>
      <Header />
      <main className={styles.main}>
        <Navbar />
        <Text
          size={70}
          css={{
            textGradient: "45deg, $black -20%, $blue600 80%",
          }}
        >
          Monitoring Tool
        </Text>
      </main>
      <Footer />
    </NextUIProvider>
  );
}