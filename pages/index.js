import Navbar from "./templates/navbar/navbar";
import Footer from "./templates/footer";

import { ironOptions } from "./api/session/session_Config";
import { withIronSessionSsr } from "iron-session/next";

import styles from "../styles/Home.module.css";
import { NextUIProvider, Spacer } from "@nextui-org/react";
import { Text, Container, Card, Row, Button, Image } from "@nextui-org/react";
import { Canvas } from "@react-three/fiber";
import Box from "../public/3D/componets/box";
import { OrbitControls } from "@react-three/drei";
import React, { Suspense } from "react";
import Sphere from "../public/3D/componets/AnimatedShape";

export default function Home({ session }) {
  session = JSON.parse(session);
  let user = session.user;

  return (
    <>
      <main className={styles.main}>
        <Navbar user={{ user }} />

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
                  Monitoring Tool
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
        </Container>
        <Spacer y={1} />
        <Container fluid>
          <Card
            css={{ $$cardColor: "transparent", backdropFilter: "blur(5px)" }}
          >
            <Card.Body>
              <Row justify="center" align="center"></Row>
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
    </>
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
