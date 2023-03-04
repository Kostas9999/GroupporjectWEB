import Navbar from "./templates/navbar/navbar";
import Footer from "./templates/footer";

import { ironOptions } from "./api/session/session_Config";
import { withIronSessionSsr } from "iron-session/next";

import styles from "../styles/Home.module.css";
import { NextUIProvider } from "@nextui-org/react";
import { Text } from "@nextui-org/react";

export default function Home({ session }) {
  session = JSON.parse(session);
  let user = session.user;

  return (
    <NextUIProvider>
      <main className={styles.main}>
        <Navbar user={{ user }} />
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

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        session: JSON.stringify(req.session),
      },
    };
  },
  ironOptions
);
