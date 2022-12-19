import Navbar from "./templates/navbar/navbar";
import Header from "./templates/header";
import Footer from "./templates/footer";

import styles from "../styles/Home.module.css";
import { NextUIProvider } from "@nextui-org/react";
import { Text } from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <div className={styles.container}>
        <Navbar />

        <Header />
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
        <Footer />
      </div>
    </NextUIProvider>
  );
}
