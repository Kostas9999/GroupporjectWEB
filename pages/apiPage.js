import Navbar from "./templates/navbar/navbar";
import { useRouter } from "next/router";
import { Snackbar, Slide } from "@mui/material";
import { useState } from "react";
import React from "react";

import { SSRProvider } from "react-aria";

import { ironOptions } from "./api/session/session_Config";
import { withIronSessionSsr } from "iron-session/next";

import styles from "../styles/Home.module.css";
import { Dropdown, Grid, Button, Row, Card, Text } from "@nextui-org/react";
let api_output = "";
let message = "";
//http://localhost:3000/api/api/serveAPI?key=<api_key>&device=<device>&table=<table>
let api_link_template =
  "http://localhost:3000/api/api/serveAPI?key=<api_key>&device=<device>&table=<table>";
let api_link = api_link_template;
export default function Home({ session }) {
  session = JSON.parse(session);
  let user = session.user;

  const router = useRouter();

  const [open, setOpen] = useState(false);
  function notification(msg) {
    message = msg;
    setOpen(true);
  }

  let device_arr = Object.keys(session.devices);
  let tables = [
    "arp",
    "baseline",
    "disc",
    "events",
    "hardware",
    "networkinterface",
    "networkstats",
    "os",
    "ports",
    "server",
    "user",
  ];

  let [selectedDev, setSelectedDev] = React.useState(new Set([device_arr[0]]));
  const selectedDevice = React.useMemo(
    () => Array.from(selectedDev),
    [selectedDev]
  );

  let [selectedTab, setSelectedTab] = React.useState(new Set([tables[0]]));
  const selectedTable = React.useMemo(
    () => Array.from(selectedTab),
    [selectedTab]
  );

  async function showApiLink() {
    let device = selectedDev.values().next().value;
    let table = selectedTab.values().next().value;

    api_link = api_link_template
      .replace("<api_key>", session.user.user_api_key)
      .replace("<device>", device)
      .replace("<table>", table);

    const response = await fetch(api_link);
    const result = await response.json().then((d) => {
      api_output = d;
    });
    console.log(result);

    router.push("/apiPage");
  }

  function toClipboard(data) {
    notification("Copied to clipboard...");
    navigator.clipboard.writeText(data);
  }

  async function generateKey() {
    notification("Generating key. Please wait...");

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
                    <Text color="white">Generate new key</Text>
                  </Button>
                </Row>
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Card css={{ h: "$24", $$cardColor: "$transparent" }}>
              <Card.Body>
                <Row justify="center" align="center">
                  <Text>title</Text>
                </Row>
                <Row justify="center" align="center">
                  <Dropdown>
                    <Dropdown.Button
                      flat
                      color="primary"
                      css={{ tt: "capitalize" }}
                    >
                      {session.devices[selectedDevice]?.os?.hostname}
                    </Dropdown.Button>
                    <Dropdown.Menu
                      aria-label="Single selection actions"
                      color="primary"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedDev}
                      onSelectionChange={setSelectedDev}
                    >
                      {Object.keys(session.devices).map((device) => (
                        <Dropdown.Item key={device}>
                          {session.devices[`${device}`].os.hostname}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Button
                      flat
                      color="primary"
                      css={{ tt: "capitalize" }}
                    >
                      {selectedTab}
                    </Dropdown.Button>
                    <Dropdown.Menu
                      aria-label="Single selection actions"
                      color="primary"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedTab}
                      onSelectionChange={setSelectedTab}
                    >
                      {tables.map((device) => (
                        <Dropdown.Item key={device}>{device}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button onPress={showApiLink}>Get Link</Button>
                </Row>
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Card css={{ h: "$24", $$cardColor: "$transparent" }}>
              <Card.Body>
                <Row justify="center" align="center">
                  <Button
                    onPress={(e) => toClipboard(api_link)}
                    color="primary"
                    auto
                    ghost
                  >
                    <Text color="white">{api_link}</Text>
                  </Button>
                </Row>
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Card css={{ h: "100%", $$cardColor: "black" }}>
              <Card.Body>
                <Row justify="center" align="center">
                  <div id="output">
                    <Text h6 size={15} color="white">
                      {JSON.stringify(api_output)}
                    </Text>
                  </div>
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
