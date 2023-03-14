import Navbar from "./templates/navbar/navbar";
import Footer from "./templates/footer";
import "@google/model-viewer/dist/model-viewer";

import { ironOptions } from "./api/session/session_Config";
import { withIronSessionSsr } from "iron-session/next";

import styles from "../styles/Home.module.css";
import { NextUIProvider, Spacer } from "@nextui-org/react";
import { Text, Container, Card, Row, Button, Image } from "@nextui-org/react";

export default function Home({ session }) {
  session = JSON.parse(session);
  let user = session.user;

  return (
    <>
      <main className={styles.main}>
        <Navbar user={{ user }} />z
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
                <div id="card">
                  <model-viewer
                    src="/3D/knowledge_network/scene.gltf"
                    ios-src=""
                    poster="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b%2Fposter-astronaut.png?v=1599079951717"
                    alt="A 3D model of an astronaut"
                    shadow-intensity="1"
                    camera-controls
                    auto-rotate
                    ar
                  ></model-viewer>
                </div>
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
