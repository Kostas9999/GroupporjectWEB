import styles from "../styles/Home.module.css";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "./templates/navbar/navbar";
import Footer from "./templates/footer";
import Header from "./templates/header";

export default function Home() {
  return (
    <NextUIProvider>
      <Header />
      <div className={styles.container}>
        <Navbar />

        <main className={styles.main}></main>
        <Footer />
      </div>
    </NextUIProvider>
  );
}
