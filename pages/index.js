import Navbar from "./templates/navbar/navbar";
import Footer from "./templates/footer";

import { ironOptions } from "./api/session/session_Config";
import { withIronSessionSsr } from "iron-session/next";

import styles from "../styles/Home.module.css";
import { NextUIProvider, Spacer } from "@nextui-org/react";
import { Text, Container, Card, Row, Button, Image } from "@nextui-org/react";

export default function Home({ session }) {
  session = JSON.parse(session);
  let user = session.user;

  return (
    <NextUIProvider>
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
                <Image
                  width={820}
                  height={500}
                  src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                  alt="Default Image"
                  objectFit="cover"
                />
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
              <Row justify="center" align="center">
                <Text
                  size={40}
                  css={{
                    textGradient: "45deg, $black -20%, $blue600 80%",
                  }}
                >
                  Screen shots
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
