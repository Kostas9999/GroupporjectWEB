import styles from "../styles/Home.module.css";
import Footer from "./templates/footer";

export default function Home() {
  return (
    <NextUIProvider>
      <div className={styles.container}>
        <Navbar />
        <Head></Head>
        <main className={styles.main}></main>
        <Footer />
      </div>
    </NextUIProvider>
  );
}
