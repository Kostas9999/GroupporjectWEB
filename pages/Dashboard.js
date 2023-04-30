import { withIronSessionSsr } from "iron-session/next";
import Navbar from "./templates/navbar/navbar";
import Footer from "./templates/footer";
import Header from "./templates/header";
import { ironOptions } from "./api/session/session_Config";
import { Container, NextUIProvider, Row, Badge } from "@nextui-org/react";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { SSRProvider } from "@react-aria/ssr";
import { Icon } from "react-icons-kit";
import { home } from "react-icons-kit/icomoon/home";
import { circle_delete } from "react-icons-kit/ikons/circle_delete";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
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
let arr = {};
let interval = 1000;
let session;
export default function Dashboard({ session }) {
  session = JSON.parse(session);

  let [os, setOs] = useState([]);

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
  let textGrad = "45deg, $blue600 -20%, $pink600 50%";

  const router = useRouter();

  const [visible_getDeviceID, setVisible_Login] = React.useState(false);
  const handler_getDeviceID = () => setVisible_Login(true);
  const closeHandler_getDeviceID = () => {
    setVisible_Login(false);
  };

  function dateTimeFormater(datetime) {
    try {
      return datetime.replaceAll("T", " ").substring(1, 20);
    } catch (error) {
      return "";
    }
  }

  function adoptHours(oldDataTime, offsetHours) {
    let mls = new Date(oldDataTime);
    return mls.setHours(mls.getHours() + offsetHours);
  }

  function isOnline(strDate) {
    return Date.now() - adoptHours(strDate, 1) > 30000;
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
      closeHandler_getDeviceID();
      router.push("/Dashboard");
    } else {
      const elem = (document.getElementById("err_adding_dev").textContent =
        result.message);
    }
  }

  let [activeDataArr, setActiveDataArr] = useState({});

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

        setActiveAll({ ...activeAll }, (activeAll[`${dev}`] = result.data));
      });

      interval = 10000;
    }, interval);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
        <Header />
        <Navbar user={{ user }} />
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
          <a id="err_adding_dev"></a>
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

        <Grid.Container gap={2} css={{ padding: "0px" }}>
          {Object.keys(session.devices).map((item, index) => (
            <Grid xs={60} sm={30} justify="center" align="right">
              <Card
                css={{
                  $$cardColor: btn_back,
                  h: "100%",
                  w: "90%",
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
                <Badge
                  enableShadow
                  disableOutline
                  color="transparent"
                  placement={"top-right"}
                >
                  <Dropdown>
                    <Dropdown.Button
                      flat
                      size={"sm"}
                      css={{ marginLeft: "auto" }}
                      color="transparent"
                    >
                      <Icon size={10} icon={circle_delete} />
                    </Dropdown.Button>
                    <Dropdown.Menu
                      aria-label="Static Actions"
                      onAction={(actionKey) => {
                        handleDeleteDev(item);
                      }}
                    >
                      <Dropdown.Item key="delete" color="error">
                        Remove device
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Badge>
                <Card.Body css={{ color: text_Color }}>
                  <div id={item}>
                    <Row width="200px">
                      <Text size={20} aria-label="hostname" color="white">
                        <h3>{session.devices[item].os.hostname}</h3>

                        {session.devices[item].os.version}
                      </Text>
                      <div
                        style={{
                          display:
                            typeof activeAll[item] === "undefined"
                              ? "none"
                              : "block",
                          padding: "0px",
                        }}
                      >
                        <Text style={{ marginLeft: "20px" }}>
                          {isOnline(activeAll[item]?.created) == 0 ? (
                            <div aria-label="online">
                              <Grid.Container gap={0} justify="center">
                                <Grid xs={12}>
                                  <Row>
                                    <Card
                                      css={{
                                        $$cardColor: "transparent",
                                        padding: "0px",
                                        w: "100%",
                                      }}
                                    >
                                      <Card.Body
                                        css={{
                                          $$cardColor: "transparent",
                                          padding: "5px",
                                        }}
                                      >
                                        <Row>
                                          <Badge
                                            enableShadow
                                            disableOutline
                                            color="success"
                                            content="Online"
                                            placement="center-left"
                                          >
                                            <Text
                                              h4
                                              color="white"
                                              css={{
                                                marginInline: "100px",
                                                padding: "0px",
                                              }}
                                            >
                                              {activeAll[item]?.publicip}
                                            </Text>
                                          </Badge>
                                        </Row>
                                        <Row>
                                          {" "}
                                          <Card
                                            css={{
                                              w: "30vh",
                                              h: "20%",
                                              $$cardColor: "transparent",
                                              padding: "0px",
                                            }}
                                          >
                                            <Card.Body
                                              css={{
                                                padding: "0px",
                                              }}
                                            >
                                              <Grid
                                                css={{
                                                  padding: "0px",
                                                }}
                                              >
                                                <Text
                                                  h4
                                                  color="white"
                                                  css={{
                                                    m: 0,
                                                    textGradient: `45deg, $blue800 0%, $red400 ${
                                                      100 - activeAll[item]?.cpu
                                                    }%`,
                                                  }}
                                                >
                                                  CPU: {activeAll[item]?.cpu}%
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
                                        </Row>
                                        <Row>
                                          <Card
                                            css={{
                                              w: "30vh",
                                              h: "50%",
                                              $$cardColor: "transparent",
                                            }}
                                          >
                                            <Card.Body
                                              css={{
                                                padding: "0px",
                                              }}
                                            >
                                              <Text
                                                h4
                                                color="white"
                                                css={{
                                                  m: 0,
                                                  textGradient: `45deg, $blue800 0%, $red400 ${
                                                    100 -
                                                    activeAll[item]?.memory
                                                  }%`,
                                                }}
                                              >
                                                RAM: {activeAll[item]?.memory}%
                                              </Text>
                                              <Progress
                                                className={styles.thirteen}
                                                css={{ display: "block" }}
                                                shadow
                                                value={activeAll[item]?.memory}
                                              ></Progress>
                                            </Card.Body>
                                          </Card>
                                        </Row>
                                      </Card.Body>
                                    </Card>
                                  </Row>
                                </Grid>
                                <Grid xs={6}></Grid>
                              </Grid.Container>
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
                                {dateTimeFormater(
                                  JSON.stringify(
                                    new Date(
                                      adoptHours(activeAll[item]?.created, 2)
                                    )
                                  )
                                )}
                              </Text>
                            </div>
                          )}
                        </Text>
                      </div>
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
        <Footer />
      </main>
    </NextUIProvider>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const { client } = require("./api/database/connections/connection");

    if (req?.session?.user?.user_id === undefined) {
      return {
        notFound: true,
      };
    }

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
