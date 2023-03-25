import { withIronSessionSsr } from "iron-session/next";
import Navbar from "./templates/navbar/navbar";
import Header from "./templates/header";
import { ironOptions } from "./api/session/session_Config";
import { Container, NextUIProvider, Row, Badge } from "@nextui-org/react";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { Snackbar, Slide } from "@mui/material";

import {
  Card,
  Button,
  Text,
  Grid,
  Modal,
  Input,
  Spacer,
  Loading,
  Dropdown,
} from "@nextui-org/react";
import React from "react";
import { Router } from "next/router";

import { useRouter } from "next/router";

let message = "";
let devicesTitle = [];

export default function Dashboard({ session }) {
  session = JSON.parse(session);
  let devices = session.devices;

  let [os, setOs] = useState([]);

  // throw new Error(`${devicesTitle.os}`);

  let activeData;
  let user = session.user;
  //console.log(session.user.user_id);

  const [showComponent, setShowComponent] = useState(false);

  function toggleComponent() {
    setShowComponent(!showComponent);
  }

  function OnlineComponent() {
    return <Badge color="success">Online</Badge>;
  }

  function OfflineComponent() {
    return <Badge color="error">Offline</Badge>;
  }

  const text_Color = "rgba(255, 255, 255, 0.9)"; // white smoke
  const btn_top_back = "rgba(255, 0, 0, 0.6)"; //red
  const btn_back = "rgba(0, 0, 0, .6)"; // black
  const card_back = "rgba(100, 100, 100, .6)"; // blue

  const router = useRouter();

  const [visible_getDeviceID, setVisible_Login] = React.useState(false);
  const handler_getDeviceID = () => setVisible_Login(true);
  const closeHandler_getDeviceID = () => {
    setVisible_Login(false);
  };

  function dateTimeFormater(datetime) {
    try {
      return datetime.replaceAll("T", " ").substring(0, 19);
    } catch (error) {
      return "";
    }
  }
  const toTimestamp = (strDate) => {
    const dt = Date.parse(strDate);

    return Date.now() - dt;
  };

  async function handleDeleteDev(id) {
    const data = {
      user_id: session.user.user_id,
      dev_id: id,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = `${session.env.host}/api/database/queries/device_remove`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (result.ok) {
      router.push("/Dashboard");
    }
  }

  async function handleSubmit_Add_Device(event) {
    event.preventDefault();

    //const name = xss(document.querySelector("#dev_ID").value);

    const data = {
      user_id: session.user.user_id,
      dev_id: event.target.dev_ID.value,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = `${session.env.host}/api/database/queries/device_add`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (result.ok) {
      router.push("/Dashboard");
    }
  }

  getOsData();
  async function getOsData() {
    Object.keys(devices).map(async (dev) => {
      const endpoint = `${session.env.host}/api/database/queries/getOs`;

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currDev: dev }),
      };

      const response = await fetch(endpoint, options);
      const result = await response.json();
      session.devices[dev].os = result.os;
      console.log(result.os);

      if (typeof document !== "undefined") {
        let getDiv = document.getElementById(dev);

        if (getDiv != null) {
          let hostname = getDiv.querySelector('[aria-label="hostname"]');
          let version = getDiv.querySelector('[aria-label="version"]');

          hostname.textContent = result.os.hostname;
          version.textContent = result.os.version;
        }
      }

      devicesTitle.push(result.os);
    });

    return devicesTitle;
    setOs(devicesTitle);
  }

  setInterval(getActiveData, 10000);
  getActiveData();
  async function getActiveData() {
    Object.keys(session.devices).map(async (dev) => {
      const endpoint = `${session.env.host}/api/database/queries/getActiveData`;

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currDev: dev }),
      };

      const response = await fetch(endpoint, options);
      const result = await response.json();

      devicesTitle.data = result.data;

      activeData = result.data[0];

      if (typeof document !== "undefined") {
        let getDiv = document.getElementById(dev);

        if (getDiv != null) {
          let spinner = getDiv.querySelector('[aria-label="spinner"]');
          let dataDiv = getDiv.querySelector('[aria-label="data"]');

          spinner.style.display = "none";
          dataDiv.style.display = "block";

          dataDiv.textContent = ` ${activeData.publicip} CPU: ${
            activeData.cpu
          } RAM: ${activeData.memory} Last Seen: ${dateTimeFormater(
            activeData.created
          )} diff ${toTimestamp(activeData.created)}`;

          if (toTimestamp(activeData.created) < 20000) {
            dataDiv.innerHTML = `<strong> Online</strong>`;
            dataDiv.style.color = "green";
            dataDiv.innerHTML += `<br> <span style="color:white", padding:"10px">  ${activeData.publicip}<br> <h5>CPU: ${activeData.cpu}% <br>RAM:  ${activeData.memory}%</h5>  </span>`;
          } else {
            dataDiv.innerHTML = `<strong> Offline</strong>`;

            dataDiv.innerHTML += `<br> <span style="color:white", padding:"10px">  Last seen: ${dateTimeFormater(
              activeData.created
            )} </span>`;

            dataDiv.style.color = "red";
          }
        }
      }
    });
  }

  const [open, setOpen] = useState(false);
  function notification(msg) {
    message = msg;
    setOpen(true);
  }

  function TransitionLeft(props) {
    return <Slide {...props} direction="right" />;
  }

  return (
    <NextUIProvider>
      <main className={styles.main}>
        <Navbar user={{ user }} />
        <Header />
        <Spacer y={1}></Spacer>

        <Button
          shadow
          size="md"
          id="getDeviceID"
          auto
          css={{ background: btn_back }}
          onPress={handler_getDeviceID}
        >
          <Text
            h6
            size={14}
            color={text_Color}
            css={{ m: 0, "line-height": "1rem" }}
          >
            Add Device
          </Text>
        </Button>
        <Spacer y={1}></Spacer>
        <Modal
          scroll
          blur
          width="30%"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={visible_getDeviceID}
          onClose={closeHandler_getDeviceID}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Device
            </Text>
          </Modal.Header>
          <form onSubmit={handleSubmit_Add_Device}>
            <Modal.Body>
              <Input
                aria-label="dev_ID"
                id="dev_ID"
                name="dev_ID"
                bordered
                color="primary"
              />
            </Modal.Body>

            <Modal.Footer>
              <Button
                auto
                flat
                color="error"
                onPress={closeHandler_getDeviceID}
              >
                Close
              </Button>
              <Button type="submit_dev_ID" auto>
                OK
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        <Grid.Container gap={2} justify="flex-start">
          {Object.keys(devices).map((item, index) => (
            <Grid xs={60} sm={30}>
              <Card
                isPressable
                isHoverable
                css={{ background: card_back }}
                shadow
                variant="bordered"
                onPress={(event) => {
                  router.push({
                    pathname: "/device",
                    query: { devID: item },
                  });
                }}
              >
                <Card.Body css={{ color: text_Color }}>
                  <div id={item}>
                    <Row justify="center" align="center">
                      <Text size={25} aria-label="hostname" color="white">
                        {item}
                      </Text>
                      <Spacer y={0}></Spacer>
                      <Row>
                        <Text aria-label="version" color="white"></Text>
                      </Row>
                      <Loading aria-label="spinner" type="points-opacity" />
                      <Container
                        aria-label="data"
                        style={{ display: "none" }}
                      ></Container>

                      <Dropdown>
                        <Dropdown.Button
                          flat
                          size={"sm"}
                          css={{ marginLeft: "auto" }}
                        >
                          Remove*
                        </Dropdown.Button>
                        <Dropdown.Menu
                          aria-label="Static Actions"
                          onAction={(actionKey) => {
                            handleDeleteDev(item);
                          }}
                        >
                          <Dropdown.Item key="delete" color="error">
                            Press to remove device*
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            </Grid>
          ))}

          <Snackbar
            TransitionComponent={TransitionLeft}
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message={message}
            color="warning"
          ></Snackbar>
        </Grid.Container>
      </main>
    </NextUIProvider>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const { client } = require("./api/database/connections/connection");

    const rows_devices = await client.query(
      `SELECT * FROM "groupproject"."device" where "user" = '${req.session.user.user_id}' ;`
    );

    // adding list of decices ids to the list
    let dev = {};
    rows_devices.rows.forEach((device) => {
      dev[device.id] = { device };
    });

    req.session.devices = dev;

    req.session.env = { host: process.env.HOST };
    await req.session.save();

    return {
      props: {
        session: JSON.stringify(req.session),
        //  devicesTitle: JSON.stringify(devicesTitle),
      },
    };
  },
  ironOptions
);
