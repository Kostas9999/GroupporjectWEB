import Navbar from "./templates/navbar/navbar";
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

  const [open, setOpen] = useState(false);
  function notification(msg) {
    message = msg;
    setOpen(true);
    navigator.clipboard.writeText(msg);
  }

  function generateKey() {
    notification("Generating key. Please wait...");
    console.log(session.user);
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
                    onPress={(e) => notification("Copied to clipboard")}
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
    console.log(api_key);
    return {
      props: {
        session: JSON.stringify(req.session),
      },
    };
  },
  ironOptions
);
