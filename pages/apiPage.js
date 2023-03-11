import Navbar from "./templates/navbar/navbar";
import { useRouter } from "next/router";
import { Snackbar, Slide } from "@mui/material";
import { useState } from "react";

import { SSRProvider } from "react-aria";

import { ironOptions } from "./api/session/session_Config";
import { withIronSessionSsr } from "iron-session/next";

import styles from "../styles/Home.module.css";
import { Loading, Grid, Button, Row, Card, Text } from "@nextui-org/react";
let message = "";
export default function Home({ session }) {
  session = JSON.parse(session);
  let user = session.user;

  const router = useRouter();

  const [open, setOpen] = useState(false);
  function notification(msg) {
    message = msg;
    setOpen(true);
  }

  function toClipboard(data) {
    notification("Copied to clipboard...");
    navigator.clipboard.writeText(data);
  }

  async function generateKey() {
    notification("Generating key. Please wait...");
    // console.log(session.user);

    /*
    const JSONdata = JSON.stringify({
      param: target.dev_ID.value,
      currDev,
      cmd: "MSG",
    });    

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    };
    */
    const endpoint = `./api/api/generateAPI`;
    const response = await fetch(endpoint);
    const result = await response.json();
    if (result.ok) {
    }
    router.push("/apiPage");
  }

  function TransitionLeft(props) {
    return <Slide {...props} direction="right" />;
  }

  return (
    <SSRProvider>
      <main className={styles.main}>
        <Navbar user={{ user }} />
        <Grid.Container gap={2}>
          <Grid xs={12}>
            <Card css={{ h: "$24", $$cardColor: "$transparent" }}>
              <Card.Body>
                <Row justify="center" align="center">
                  <Button
                    onPress={(e) => toClipboard(session.user.user_api_key)}
                    color="primary"
                    auto
                    ghost
                  >
                    <Text color="white">{user.user_api_key}</Text>
                  </Button>
                  <Button
                    onPress={(e) => generateKey()}
                    color="warning"
                    auto
                    ghost
                  >
                    <Text color="white">Generate new</Text>
                  </Button>
                </Row>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>

        <Snackbar
          TransitionComponent={TransitionLeft}
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={2000}
          message={message}
        ></Snackbar>
      </main>
    </SSRProvider>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    let api_key = req.session.user.user_api_key;
    if (api_key == null) {
      req.session.user.user_api_key = "N/A";
    }

    return {
      props: {
        session: JSON.stringify(req.session),
      },
    };
  },
  ironOptions
);
