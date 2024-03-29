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
    "https://filedn.eu/laylI9rT8UjYMnCgviybMrh/web_images/monTool/dashboard.png",
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
                <a href="https://filedn.eu/laylI9rT8UjYMnCgviybMrh/web_images/monToolSetup.exe">
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
                </a>
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
                  <Text h4 color="white" css={{ m: 10 }}>
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
                  w: "fit-content",
                }}
              >
                <Row justify="center" align="center">
                  <Text h4 color="white" css={{ m: 10 }}>
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
                  w: "fit-content",
                }}
              >
                <Row justify="center" align="center">
                  <Text h4 color="white" css={{ m: 10 }}>
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
                  w: "fit-content",
                }}
              >
                <Row justify="center" align="center">
                  <Text h4 color="white" css={{ m: 10 }}>
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
                        monTool can offer you
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
                        and much more...
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
          <Fade pauseOnHover={false} indicators={true}>
            <div className="each-slide">
              <div>
                <Text
                  justify="center"
                  align="center"
                  size={50}
                  css={{
                    textGradient: "45deg, $black -20%, $blue600 80%",
                  }}
                >
                  Access your data over API
                </Text>
                <div>
                  <Image showSkeleton maxDelay={10000} src={images[0]} />
                </div>
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
                Discover Network Neighbours
              </Text>
              <div>
                <Image showSkeleton maxDelay={10000} src={images[1]} />
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
                Build and Export Baseline
              </Text>
              <div>
                <Image showSkeleton maxDelay={10000} src={images[2]} />
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
                Event History
              </Text>
              <div>
                <Image showSkeleton maxDelay={10000} src={images[3]} />
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
                Storage
              </Text>
              <div>
                <Image showSkeleton maxDelay={10000} src={images[4]} />
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
                Latency
              </Text>
              <div>
                <Image showSkeleton maxDelay={10000} src={images[5]} />
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
                Open Ports
              </Text>
              <div>
                <Image showSkeleton maxDelay={10000} src={images[6]} />
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
                Remote Shutdown/Restart
              </Text>
              <div>
                <Image showSkeleton maxDelay={10000} src={images[7]} />
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
                Overview
              </Text>
              <div>
                <Image showSkeleton maxDelay={10000} src={images[8]} />
              </div>
            </div>
          </Fade>
        </div>
        <Footer />
      </main>

      {/*}
      <div>
        <button onClick={toggleComponent}></button>
        {showComponent ? <ComponentOne /> : <ComponentTwo />}

      </div>
              {*/}
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
