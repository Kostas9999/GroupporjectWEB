import Navbar from "./templates/navbar/navbar";
import Footer from "./templates/footer";

import { ironOptions } from "./api/session/session_Config";
import { withIronSessionSsr } from "iron-session/next";

import styles from "../styles/Home.module.css";
import { NextUIProvider, Spacer } from "@nextui-org/react";
import { Text, Container, Card, Row, Button, Image } from "@nextui-org/react";

import React from "react";
import { color } from "@mui/system";

export default function Home({ session }) {
  session = JSON.parse(session);
  let user = session.user;

  return (
    <NextUIProvider>
      <main className={styles.main}>
        <Navbar user={{ user }} />

        <Container fluid>
          <Card
            css={{
              $$cardColor: "transparent",
              backdropFilter: "blur(5px)",
              height: "80vh",
              width: "100%",
            }}
          >
            <Card.Body>
              <Row justify="center" align="center">
                <Text
                  size={50}
                  css={{
                    textGradient: "45deg, $black -20%, $blue600 80%",
                  }}
                >
                  We do better than others and other bla bla stuff
                </Text>
              </Row>
              <Row justify="center" align="center">
                <Button color="gradient" auto ghost className={styles.thirteen}>
                  <Text
                    size={20}
                    css={{
                      textGradient: "45deg, $black -20%, $blue600 80%",
                    }}
                  >
                    Download app
                  </Text>
                </Button>
              </Row>
            </Card.Body>
          </Card>

          <Row justify="center" align="center">
            <Card
              css={{
                bottom: "100px",
                m: "50px",
              }}
              className={styles.thirteen}
            >
              <Card.Body>
                <Row justify="center" align="center">
                  <Text h6 color="white" css={{ m: 0 }}>
                    Latency
                  </Text>
                </Row>
                <Row justify="center" align="center">
                  <Text h5 color="white" css={{ m: 0 }}>
                    Public 33ms/s
                  </Text>
                </Row>
                <Row justify="center" align="center">
                  <Text h5 color="white" css={{ m: 0 }}>
                    Local 1ms/s
                  </Text>
                </Row>
              </Card.Body>
            </Card>
            <Card
              css={{
                bottom: "100px",
                m: "50px",
              }}
              className={styles.thirteen}
            >
              <Card.Body>
                <Row justify="center" align="center">
                  <Text h6 size={15} color="white" css={{ m: 0 }}>
                    NetStats
                  </Text>
                </Row>
              </Card.Body>
            </Card>
            <Card
              css={{
                bottom: "100px",
                m: "50px",
              }}
              className={styles.thirteen}
            >
              <Card.Body>
                <Row justify="center" align="center">
                  <Text h6 size={15} color="white" css={{ m: 0 }}>
                    NetStats
                  </Text>
                </Row>
              </Card.Body>
            </Card>
            <Card
              css={{
                bottom: "100px",
                m: "50px",
              }}
              className={styles.thirteen}
            >
              <Card.Body>
                <Row justify="center" align="center">
                  <Text h6 size={15} color="white" css={{ m: 0 }}>
                    NetStats4
                  </Text>
                </Row>
              </Card.Body>
            </Card>
          </Row>
        </Container>

        <Spacer y={1} />
        <Container fluid>
          <Card
            css={{ $$cardColor: "transparent", backdropFilter: "blur(5px)" }}
          >
            <Card.Body>
              <Row justify="center" align="center">
                <Text
                  size={70}
                  css={{
                    textGradient: "45deg, $black -20%, $blue600 80%",
                  }}
                >
                  Info
                </Text>
              </Row>
            </Card.Body>
          </Card>
        </Container>
        <Spacer y={1} />
        <Container fluid>
          <Card
            css={{ $$cardColor: "transparent", backdropFilter: "blur(5px)" }}
          >
            <Card.Body>
              <Row justify="center" align="center">
                <Text
                  size={70}
                  css={{
                    textGradient: "45deg, $black -20%, $blue600 80%",
                  }}
                >
                  Images
                </Text>
              </Row>
            </Card.Body>
          </Card>
        </Container>
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
