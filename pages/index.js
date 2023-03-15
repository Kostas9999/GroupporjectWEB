import Navbar from "./templates/navbar/navbar";
import Footer from "./templates/footer";

import { ironOptions } from "./api/session/session_Config";
import { withIronSessionSsr } from "iron-session/next";

import styles from "../styles/Home.module.css";
import { NextUIProvider, Spacer } from "@nextui-org/react";
import {
  Text,
  Container,
  Card,
  Row,
  Button,
  Image,
  Checkbox,
} from "@nextui-org/react";

import React from "react";
import { color } from "@mui/system";

export default function Home({ session }) {
  session = JSON.parse(session);
  let user = session.user;

  let checkBoxItems = ["item1", "item2"];

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
                  justify="center"
                  align="center"
                  size={50}
                  css={{
                    textGradient: "45deg, $black -20%, $blue600 80%",
                    marginTop: "100px",
                  }}
                >
                  We do better than others and other bla bla stuff
                </Text>
              </Row>
              <Row justify="center" align="center">
                <Text
                  justify="center"
                  align="center"
                  size={20}
                  css={{
                    textGradient: "45deg, $black -20%, $blue600 80%",
                    marginTop: "50px",
                  }}
                >
                  "Small bla bla stuff"
                </Text>
              </Row>
              <Row justify="center" align="center">
                <Button
                  color="gradient"
                  auto
                  ghost
                  className={styles.thirteen}
                  css={{
                    marginTop: "100px",
                  }}
                >
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
          <Card css={{ $$cardColor: "green" }}>
            <Card.Body>
              <Row justify="center" align="center">
                <Card
                  s
                  css={{ $$cardColor: "red", height: "80vh", margin: "10px" }}
                >
                  <Card.Body>
                    <Row justify="center" align="center">
                      <Text
                        size={50}
                        css={{
                          textGradient: "45deg, $black -20%, $blue600 80%",
                        }}
                      >
                        we do that and that and more of that
                      </Text>
                    </Row>
                    {checkBoxItems.map((item) => (
                      <Row justify="center" align="center">
                        <Checkbox isRounded defaultSelected color="primary">
                          <Text
                            size={30}
                            css={{
                              textGradient: "45deg, $black -20%, $blue600 80%",
                            }}
                          >
                            {item}
                          </Text>
                        </Checkbox>
                      </Row>
                    ))}
                    <Row justify="center" align="center">
                      <Text
                        size={50}
                        css={{
                          textGradient: "45deg, $black -20%, $blue600 80%",
                        }}
                      >
                        also some of that
                      </Text>
                    </Row>
                  </Card.Body>
                </Card>

                <Card s css={{ $$cardColor: "red", height: "80vh" }}>
                  <Card.Body>
                    <Row justify="center" align="center">
                      <Image
                        src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                        alt="Default Image"
                      />
                    </Row>
                  </Card.Body>
                </Card>
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
                  Screenshots carusele
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
