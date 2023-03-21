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

import React, { useState } from "react";

export default function Home({ session }) {
  session = JSON.parse(session);
  let user = session.user;

  const [showComponent, setShowComponent] = useState(false);

  const toggleComponent = () => {
    setShowComponent(!showComponent);
  };

  function ComponentOne() {
    return <h1>Component One</h1>;
  }

  function ComponentTwo() {
    return <h1>Component Two</h1>;
  }

  let checkBoxItems = [
    "API",
    "Email on Events",
    "Network Performance",
    "MultiDevice Monitoring",
    "Hardware Monitoring",

    "Build and Export Baseline",
    "Remote Restart/Shutdown",
  ];

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
          <Card css={{ background: "transparent" }}>
            <Card.Body>
              <Row justify="center" align="center">
                <Card
                  css={{
                    background: "transparent",
                    minHeight: "80vh",

                    margin: "10px",
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
                        }}
                      >
                        we do that and that and more of that
                      </Text>
                    </Row>

                    {checkBoxItems.map((item) => (
                      <Row fluid justify="left" align="center">
                        <Checkbox isRounded defaultSelected>
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
                        justify="center"
                        align="center"
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

                <Card css={{ background: "transparent", height: "80vh" }}>
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
                  justify="center"
                  align="center"
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
        <div>
          <button onClick={toggleComponent}></button>
          {showComponent ? <ComponentOne /> : <ComponentTwo />}
        </div>
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
