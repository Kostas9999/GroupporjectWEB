import Navbar from "./templates/navbar/navbar";
import Footer from "./templates/footer";

import { ironOptions } from "./api/session/session_Config";
import { withIronSessionSsr } from "iron-session/next";

import styles from "../styles/Home.module.css";
import { NextUIProvider, Spacer } from "@nextui-org/react";

import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import {
  Text,
  Container,
  Card,
  Row,
  Button,
  Image,
  Checkbox,
} from "@nextui-org/react";

import { createTheme, Link, styled } from "@nextui-org/react";

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {},
  },
});

import React, { useState } from "react";

export default function Home({ session }) {
  session = JSON.parse(session);
  let user = session.user;

  const images = [
    "https://filedn.eu/laylI9rT8UjYMnCgviybMrh/web_images/monTool/api.png",
    "https://filedn.eu/laylI9rT8UjYMnCgviybMrh/web_images/monTool/arp.png",
    "https://filedn.eu/laylI9rT8UjYMnCgviybMrh/web_images/monTool/baseline.png",
    "https://filedn.eu/laylI9rT8UjYMnCgviybMrh/web_images/monTool/events.png",
    "https://filedn.eu/laylI9rT8UjYMnCgviybMrh/web_images/monTool/hdd.png",
    "https://filedn.eu/laylI9rT8UjYMnCgviybMrh/web_images/monTool/latency.png",
    "https://filedn.eu/laylI9rT8UjYMnCgviybMrh/web_images/monTool/ports.png",
    "https://filedn.eu/laylI9rT8UjYMnCgviybMrh/web_images/monTool/shutdown.png",
  ];

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
                    textGradient: "45deg, $black -20%, $blue600 50%",
                    marginTop: "100px",
                  }}
                >
                  Simple and easy way to track your network behavior
                </Text>
              </Row>
              <Row justify="center" align="center">
                <Text
                  justify="center"
                  align="center"
                  size={20}
                  css={{
                    textGradient: "45deg, $black -20%, $blue600 30%",
                    marginTop: "50px",
                  }}
                >
                  Real time system monitoring tool for windows systems - monTool
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
                    Free Download
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
                backgroundColor: "$primary",
              }}
              className={styles.thirteen}
            >
              <Card.Body
                css={{
                  margin: "1px",

                  w: "fit-content",
                }}
              >
                <Row justify="center" align="center">
                  <Text h4 color="white" css={{ m: 0 }}>
                    Network Latency
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
                backgroundColor: "$primary",
              }}
              className={styles.thirteen}
            >
              <Card.Body
                css={{
                  margin: "1px",
                }}
              >
                <Row justify="center" align="center">
                  <Text h4 color="white" css={{ m: 0 }}>
                    NetStats
                  </Text>
                </Row>
                <Row justify="center" align="center">
                  <Text h5 size={15} color="white" css={{ m: 0 }}>
                    rx_total: 708.02 MB <br></br>rx_error: 0 Bytes
                    <br></br>rx_dropped: 0 Bytes <br></br>tx_total: 56.49 MB{" "}
                    <br></br>tx_error: 0 Bytes <br></br>tx_dropped: 0 Bytes
                  </Text>
                </Row>
              </Card.Body>
            </Card>
            <Card
              css={{
                bottom: "100px",
                m: "50px",
                backgroundColor: "$primary",
              }}
              className={styles.thirteen}
            >
              <Card.Body
                css={{
                  margin: "1px",
                }}
              >
                <Row justify="center" align="center">
                  <Text h4 color="white" css={{ m: 0 }}>
                    NIC
                  </Text>
                </Row>
                <Row justify="center" align="center">
                  <Text h6 size={15} color="white" css={{ m: 0 }}>
                    Ethernet: 1000(mb/s) <br></br>MAC: 10:7b:44:1b:91:a1{" "}
                    <br></br>IPv4: 192.168.1.33 <br></br>IPv4Sub: 255.255.255.0{" "}
                    <br></br>IPv6: fe80::f522:f453:8028:2995 <br></br>IPv6Sub:
                    ffff:ffff:ffff:ffff::
                  </Text>
                </Row>
              </Card.Body>
            </Card>
            <Card
              css={{
                bottom: "100px",
                m: "50px",
                backgroundColor: "$primary",
              }}
              className={styles.thirteen}
            >
              <Card.Body
                css={{
                  margin: "1px",
                }}
              >
                <Row justify="center" align="center">
                  <Text h4 color="white" css={{ m: 0 }}>
                    OS
                  </Text>
                </Row>
                <Row justify="center" align="center">
                  <Text h6 color="white" css={{ m: 0 }}>
                    Last Seen: 2023-04-01 09:06:07 <br></br>Asus <br></br>
                    Microsoft Windows 11 Pro 10.0.22624 (22624)
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

                <Card
                  css={{
                    $$cardColor: "transparent",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  <Card.Body>
                    <Row justify="center" align="center">
                      <Image
                        showSkeleton
                        maxDelay={10000}
                        src="https://filedn.eu/laylI9rT8UjYMnCgviybMrh/web_images/monTool/latency.png"
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
        <Container fluid></Container>

        <div>
          <Fade>
            <div className="each-slide">
              <div>
                <img src={images[0]} />
              </div>
              <p>First Slide</p>
            </div>
            <div className="each-slide">
              <p>Second Slide</p>
              <div>
                <img src={images[1]} />
              </div>
            </div>
            <div className="each-slide">
              <Text
                justify="center"
                align="center"
                size={50}
                css={{
                  textGradient: "45deg, $black -20%, $blue600 80%",
                }}
              >
                Baseline
              </Text>
              <div>
                <img src={images[2]} />
              </div>
            </div>
          </Fade>
        </div>
      </main>

      <Footer />
      <div>
        <button onClick={toggleComponent}></button>
        {showComponent ? <ComponentOne /> : <ComponentTwo />}
      </div>
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
