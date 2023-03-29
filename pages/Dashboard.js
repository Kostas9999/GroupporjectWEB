import { withIronSessionSsr } from "iron-session/next";
import Navbar from "./templates/navbar/navbar";
import Header from "./templates/header";
import { ironOptions } from "./api/session/session_Config";
import { Container, NextUIProvider, Row, Badge } from "@nextui-org/react";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { SSRProvider } from "@react-aria/ssr";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
  Progress,
} from "@nextui-org/react";
import React from "react";
import { Router } from "next/router";

import { useRouter } from "next/router";
import { fontSize } from "@mui/system";

let message = "";
let devicesTitle = [];
let activeData_intervar = [];
let arr = [];

let session;
export default function Dashboard({ session }) {
  session = JSON.parse(session);

  //console.log(session.devices);

  let [os, setOs] = useState([]);

  // throw new Error(`${devicesTitle.os}`);

  let activeData;
  let user = session.user;

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
  const btn_back = "rgba(50, 50, 50, .6)"; // black
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
  function isOnline(strDate) {
    let timeOfset = 7200000;
    const dt = Date.parse(strDate) + timeOfset;

    if (Date.now() - dt > 2000) {
      return 0;
    } else {
      return 1;
    }

    // return Date.now() - dt > 2000;
  }

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

  // clearInterval(activeData_intervar);
  /*
  async function getActiveDataAll() {
    const endpoint = `${session.env.host}/api/database/queries/getActiveDataAll`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ devices: session.devices }),
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    newActiveDataAll = result.activeData;
  
  }
*/

  const [activeAll, setActiveAll] = useState({});
  useEffect(() => {
    const intervalId = setInterval(async () => {
      Object.keys(session.devices).forEach(async (dev) => {
        const endpoint = `${session.env.host}/api/database/queries/getActiveData`;

        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currDev: dev }),
        };

        const response = await fetch(endpoint, options);
        const result = await response.json();
        arr[0] = result.data;
      });

      setActiveAll([...arr, arr]);
      console.log(arr);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  /*
  const [dataActiveAll, setDataActiveAll] = useState([]);
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const endpoint = `${session.env.host}/api/database/queries/getActiveDataAll`;

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ devices: session.devices }),
      };
      console.log(options.body);

      const response = await fetch(endpoint, options);
      const result = await response.json();

      newActiveDataAll = result.activeData;

      setDataActiveAll(newActiveDataAll);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dataActiveAll]);
  */
  //

  // clearInterval(activeData_intervar);

  // activeData_intervar = setInterval(getActiveData, 10000);
  // getActiveData()
  /*
  async function getActiveData() {
    Object.keys(session.devices).forEach(async (dev) => {
      const endpoint = `${session.env.host}/api/database/queries/getActiveData`;

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currDev: dev }),
      };

      const response = await fetch(endpoint, options);
      const result = await response.json();

      activeData = result.data;

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
*/
  const [open, setOpen] = useState(false);
  function notification(msg) {
    message = msg;
    setOpen(true);
  }

  function TransitionLeft(props) {
    return <Slide {...props} direction="right" />;
  }

  return (
    <SSRProvider>
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
            {Object.keys(session.devices).map((item, index) => (
              <Grid xs={60} sm={30}>
                <Card
                  css={{
                    $$cardColor: btn_back,
                    h: "100%",
                    w: "100%",
                  }}
                  isPressable
                  isHoverable
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
                      <Row justify="center" align="center" width="200px">
                        <Text size={20} aria-label="hostname" color="white">
                          <h3>{session.devices[item].os.hostname}</h3>

                          {session.devices[item].os.version}
                        </Text>

                        <Text style={{ marginLeft: "20px" }}>
                          {" "}
                          {isOnline(activeAll[item]?.created) == 1 ? (
                            <div aria-label="online">
                              <Card
                                css={{
                                  $$cardColor: "transparent",
                                }}
                              >
                                <Card.Body>
                                  <Badge
                                    enableShadow
                                    disableOutline
                                    color="success"
                                  >
                                    Online
                                  </Badge>
                                </Card.Body>
                              </Card>

                              <Card
                                css={{
                                  w: "500px",
                                  h: "20%",
                                  $$cardColor: "transparent",
                                }}
                              >
                                <Card.Body>
                                  <Grid>
                                    <Text h4 color="white" css={{ m: 0 }}>
                                      CPU: {JSON.stringify(activeAll)}%
                                    </Text>
                                    <Progress
                                      value={activeAll[item]?.cpu}
                                      className={styles.thirteen}
                                      css={{ display: "block" }}
                                      shadow
                                    ></Progress>
                                  </Grid>
                                </Card.Body>
                              </Card>

                              <Card
                                css={{
                                  w: "500px",
                                  h: "50%",
                                  $$cardColor: "transparent",
                                }}
                              >
                                <Card.Body>
                                  <Text h4 color="white" css={{ m: 0 }}>
                                    RAM: {activeAll[item]?.iface}%
                                  </Text>
                                  <Progress
                                    className={styles.thirteen}
                                    css={{ display: "block" }}
                                    shadow
                                    value={activeAll[item]?.memory}
                                  ></Progress>
                                </Card.Body>
                              </Card>
                            </div>
                          ) : (
                            <div>
                              <Badge enableShadow disableOutline color="error">
                                Offline
                              </Badge>
                              <Text
                                style={{ marginTop: "10px" }}
                                color="warning"
                              >
                                Last Seen:{" "}
                                {dateTimeFormater(activeAll[item]?.created)}
                              </Text>
                            </div>
                          )}
                        </Text>

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
    </SSRProvider>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const { client } = require("./api/database/connections/connection");

    const rows_devices = await client.query(
      `SELECT * FROM "groupproject"."device" where "user" = '${req.session.user.user_id}' ;`
    );

    let dev = {};
    rows_devices.rows.forEach((data) => {
      dev[`${data.id}`] = { data };
    });

    let devicesTitle = [];
    if (rows_devices.rowCount > 0) {
      const devices = rows_devices.rows;

      for (const item of devices) {
        const rows = await client.query(`SELECT * FROM "${item.id}"."os" ;`);
        rows.rows[0].id = item.id;
        devicesTitle.push(rows.rows[0]);
        dev[`${item.id}`].os = rows.rows[0];
      }
    }

    req.session.devices = dev;
    req.session.env = { host: process.env.HOST };
    await req.session.save();

    return {
      props: {
        session: JSON.stringify(req.session),
        // devicesTitle: JSON.stringify(devicesTitle),
      },
    };
  },
  ironOptions
);
