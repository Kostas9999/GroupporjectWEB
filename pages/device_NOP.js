import Head from "next/head";
import { ironOptions } from "./api/session/session_Config";
import { withIronSessionSsr } from "iron-session/next";

import Navbar from "./templates/navbar/navbar";
import React, { PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { NotificationIcon } from "../public/img/js/notification";
import { useState } from "react";

import { Snackbar, Slide } from "@mui/material";

import { useRouter } from "next/router";

import { NextUIProvider, Loading } from "@nextui-org/react";
import styles from "../styles/Home.module.css";

const json2csv = require("json2csv");

import {
  Collapse,
  Input,
  Modal,
  Dropdown,
  Text,
  Row,
  Table,
  Container,
  Progress,
  Spacer,
  Card,
  Grid,
  Button,
} from "@nextui-org/react";
import { padding } from "@mui/system";
let message = "";
export default function Home({ session, currDev }) {
  session = JSON.parse(session);
  console.log(session);

  let user = session.user;
  let table = "hardware";
  getData(table);
  async function getData() {
    const endpoint = `${session.env.host}/api/database/queries/getData_db`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currDev, table }),
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (hw.title === "") {
      let spinner = (document.querySelector(
        `[aria-label="${table}-spinner"]`
      ).style.display = "none");
      setHw({ title: result.hw.title, totalmemory: result.hw.totalmemory });
    }
    /*
    if (typeof document !== "undefined") {
      let getDiv = document.getElementById("hw");

      if (getDiv != null) {
        let title = getDiv.querySelector('[aria-label="hw-title"]');
        let ram = getDiv.querySelector('[aria-label="hw-ram"]');
        let spinner = getDiv.querySelector('[aria-label="spinner-hw"]').style.display = "none";

        spinner.style.display = "none";

        title.textContent = result.hw.title;

        ram.textContent =
          "RAM: " + formatBytes(Math.ceil(result.hw.totalmemory));
      }
     
    }
     */
  }

  const [hw, setHw] = useState({ title: "", totalmemory: "" });

  const [iface, setIface] = useState({
    iface: "",
    ipv4: "",
    ipv4sub: "",
    ipv6: "",
    ipv6sub: "",
    mac: "",
    speed: "",
  });

  const [open, setOpen] = useState(false);
  function notification(msg) {
    message = msg;
    setOpen(true);
  }

  function TransitionLeft(props) {
    return <Slide {...props} direction="right" />;
  }

  async function send_MSG(event) {
    event.preventDefault();
    closeHandler_MSG();
    notification("Message sent..");

    console.log(event.target.dev_ID);

    const JSONdata = JSON.stringify({
      param: event.target.dev_ID.value,
      currDev,
      cmd: "MSG",
    });

    const endpoint = `/api/tcp/connect`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
  }

  let disc = session.devices[`${currDev}`].disc;
  let arp = session.devices[`${currDev}`].arp;
  let ports = session.devices[`${currDev}`].ports;

  const router = useRouter();
  const text_Color = "rgba(255, 255, 255, 0.9)"; // white smoke
  const btn_top_back = "rgba(255, 0, 0, 0.6)"; //red
  const btn_back = "rgba(0, 0, 0, .6)"; // black
  const card_back = "rgba(100, 100, 100, .6)"; // blue

  function formatBytes(a, b = 2) {
    if (!+a) return "0 Bytes";
    const c = 0 > b ? 0 : b,
      d = Math.floor(Math.log(a) / Math.log(1024));
    return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
      ["Bytes", "KB", "MB", "GB", "TB"][d]
    }`;
  }

  function dateTimeFormater(datetime) {
    return datetime.replaceAll("T", " ").substring(0, 19);
  }

  let keys_port = Object.keys(ports[0]);
  keys_port.push("action");

  const columns_port = [];
  keys_port.map((item, index) =>
    columns_port.push({
      key: item,
      label: item,
    })
  );

  const rows_port = [];
  ports.map((item, index) =>
    rows_port.push({
      key: index,
      port: item.port,
      processname: item.processname,
      pid: item.pid,
      processpath: item.processpath,
      created: dateTimeFormater(item.created),
      action: (
        <Button
          onPress={(e) => closeApp("PRT_CLOSE", item.pid)}
          auto
          ghost
          color="error"
          bordered
        >
          Close
        </Button>
      ),
    })
  );

  let keys_arp;
  keys_arp = Object.keys(arp[0]);

  const columns_arp = [];
  keys_arp.map((item, index) =>
    columns_arp.push({
      key: item,
      label: item,
    })
  );

  const rows_arp = [];
  arp.map((item, index) =>
    rows_arp.push({
      key: index,
      ip: item.ip,
      mac: item.mac,
      type: item.type,
      created: dateTimeFormater(item.created),
    })
  );

  let keys;
  session.devices[`${currDev}`].events.map(
    (item, index) => (keys = Object.keys(item))
  );

  if (keys === undefined) {
    keys = ["none"];
  }

  const columns_events = [];
  keys.map((item, index) =>
    columns_events.push({
      key: item,
      label: item,
    })
  );

  const rows_events = [];
  session.devices[`${currDev}`].events.map((item, index) =>
    rows_events.push({
      key: item.event_id,
      event_id: item.event_id,
      type: item.type,
      value: item.value,
      baseline: item.baseline,
      created: dateTimeFormater(item.created),
    })
  );

  const handleSelect = (e) => {
    router.push({
      pathname: "/device",
      query: { devID: e },
    });
  };

  //  setInterval(refresh, 10000);

  async function refresh() {
    console.log(window.pageYOffset);

    router.push({
      pathname: "/device",
      query: { devID: currDev },
    });
  }

  async function displaySection(id) {
    //  refresh(); //////////////////////////////////////////// good idea but make window jump to top (update element values only?)
    let myIDs = ["charts", "disc", "events", "arp", "ports", "baseline"];

    myIDs.forEach((e) => {
      if (id == e) {
        document.getElementById(e).style.display = "block";
      } else {
        document.getElementById(e).style.display = "none";
      }
    });
  }

  //****************************************** */
  // close port by sending pid value to a function
  //*************************************** */
  async function closeApp(type, param) {
    const JSONdata = JSON.stringify({
      param: param,
      currDev,
      cmd: type,
    });

    const endpoint = `/api/tcp/connect`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (result.ok) {
    }
  }

  const latencyData = session.devices[`${currDev}`].networkStats.reverse();
  const [visible_Reg, setVisible_Power] = React.useState(false);
  const handler_Power = () => setVisible_Power(true);

  const closeHandler_Reg = () => {
    setVisible_Power(false);
  };

  const [visible_MSG, setVisible_MSG] = React.useState(false);
  const openHandler_MSG = () => setVisible_MSG(true);
  const closeHandler_MSG = () => setVisible_MSG(false);

  //==================================================== export

  function downloadCsv() {
    const element = document.createElement("a");

    element.setAttribute(
      "href",
      `data:text/csv;charset=utf-8,${json2csv.parse(
        all.devices[`${currDev}`].baseline[0]
      )}`
    );
    element.setAttribute("download", "filename");
    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  //console.log(window.document.getElementById("charts"));
  return (
    <>
      <Head>
        <title>NetMon</title>
        <meta name="description" content="Monitoring Tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar user={{ user }} />

        <Spacer y={1}></Spacer>

        <Grid.Container gap={2} justify="left">
          {/* ========================================================= Start First row
           Start first row         
          */}

          <Grid xs={12}>
            <Container>
              <Card css={{ $$cardColor: btn_back }} className={styles.thirteen}>
                <Card.Body>
                  <Row justify="center" align="right">
                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                      Last Seen:{" "}
                      {dateTimeFormater(
                        session.devices[`${currDev}`].networkStats[0].created
                      )}
                      <Spacer y={0}></Spacer>
                      {session.devices[`${currDev}`].os.hostname}
                      <Spacer y={0}></Spacer>
                      {session.devices[`${currDev}`].os.version}
                      <Spacer y={0}></Spacer>
                      {session.devices[`${currDev}`].os.relese} (
                      {session.devices[`${currDev}`].os.build})
                    </Text>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
            <Container>
              <Card css={{ $$cardColor: btn_back }} className={styles.thirteen}>
                <Card.Body>
                  <Row justify="center" align="right">
                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                      <Loading
                        aria-label="hardware-spinner"
                        type="points-opacity"
                      />
                      {hw.title}
                      <br></br>
                      RAM: {formatBytes(hw.totalmemory)}
                      <Spacer y={0}></Spacer>
                    </Text>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
            <Container>
              <Card css={{ $$cardColor: btn_back }} className={styles.thirteen}>
                <Card.Body>
                  <Row justify="center" align="right">
                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                      {session.devices[`${currDev}`].iface[0].iface}
                      {"   \t "}
                      {session.devices[`${currDev}`].iface[0].speed}(mb/s)
                      <Spacer y={0}></Spacer>
                      MAC: {session.devices[`${currDev}`].iface[0].mac}
                      <Spacer y={0}></Spacer>
                      IPv4: {session.devices[`${currDev}`].iface[0].ipv4}
                      <Spacer y={0}></Spacer>
                      IPv4Sub: {session.devices[`${currDev}`].iface[0].ipv4sub}
                      <Spacer y={0}></Spacer>
                      IPv6: {session.devices[`${currDev}`].iface[0].ipv6}
                      <Spacer y={0}></Spacer>
                      IPv6Sub: {session.devices[`${currDev}`].iface[0].ipv6sub}
                    </Text>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
            <Container>
              <Card css={{ $$cardColor: btn_back }} className={styles.thirteen}>
                <Card.Body>
                  <Row justify="center" align="right">
                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                      rx_total:{" "}
                      {formatBytes(
                        session.devices[`${currDev}`].networkStats[0].rx_total
                      )}
                      <Spacer y={0}></Spacer>
                      rx_error:{" "}
                      {formatBytes(
                        session.devices[`${currDev}`].networkStats[0].rx_error
                      )}
                      <Spacer y={0}></Spacer>
                      rx_dropped:{" "}
                      {formatBytes(
                        session.devices[`${currDev}`].networkStats[0].rx_dropped
                      )}
                      <Spacer y={0}></Spacer>
                      tx_total:{" "}
                      {formatBytes(
                        session.devices[`${currDev}`].networkStats[0].tx_total
                      )}
                      <Spacer y={0}></Spacer>
                      tx_error:{" "}
                      {formatBytes(
                        session.devices[`${currDev}`].networkStats[0].tx_error
                      )}
                      <Spacer y={0}></Spacer>
                      tx_dropped:{" "}
                      {formatBytes(
                        session.devices[`${currDev}`].networkStats[0].tx_dropped
                      )}
                    </Text>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
            <Container>
              <Card css={{ $$cardColor: btn_back }} className={styles.thirteen}>
                <Card.Body>
                  <Row justify="center" align="right">
                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                      Local Latency:{" "}
                      {
                        session.devices[`${currDev}`].networkStats[0]
                          .locallatency
                      }
                      ms
                      <Spacer y={0}></Spacer>
                      Public Latency:{" "}
                      {
                        session.devices[`${currDev}`].networkStats[0]
                          .publiclatency
                      }
                      ms
                      <Spacer y={0}></Spacer>
                      Gateway:
                      {
                        session.devices[`${currDev}`].networkStats[0]
                          .defaultgateway
                      }
                      <Spacer y={0}></Spacer>
                      Gateway MAC:
                      {session.devices[`${currDev}`].networkStats[0].dgmac}
                      <Spacer y={0}></Spacer>
                      Server: {session.devices[`${currDev}`]?.server[0]?.ip} (
                      {session.devices[`${currDev}`]?.server[0]?.port})
                    </Text>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
          </Grid>

          {/* ========================================================= End First row
           END first row         
          */}
          {/* ========================================================= Start second row SIDEBAR
           Start second row         
          */}
          <Grid xs={2}>
            <Container hidden>
              <Card
                css={{
                  $$cardColor: btn_back,
                  h: "100%",
                  w: "100%",
                }}
              >
                <Row justify="center">
                  {
                    <Dropdown>
                      <Dropdown.Button
                        size="md"
                        auto
                        shadow
                        css={{ background: btn_back }}
                        className={styles.thirteen}
                      >
                        Select Device
                      </Dropdown.Button>

                      <Dropdown.Menu
                        onAction={(actionKey) => {
                          handleSelect(actionKey);
                        }}
                      >
                        {Object.keys(session.devices).map((device) => (
                          <Dropdown.Item key={device}>
                            {session.devices[`${device}`].os.hostname}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  }
                </Row>
                <Spacer y={1}></Spacer>
                <Card.Body>
                  <Row justify="center" align="right">
                    <Button
                      onPress={refresh}
                      size="md"
                      auto
                      shadow
                      css={{ background: btn_back, width: "15vh" }}
                      className={styles.thirteen}
                    >
                      Refresh
                    </Button>
                  </Row>
                  <Spacer y={1}></Spacer>
                  <Row justify="center" align="right">
                    <Button
                      onClick={(e) => displaySection("charts")}
                      size="md"
                      auto
                      shadow
                      css={{ background: btn_back, width: "15vh" }}
                      className={styles.thirteen}
                    >
                      Latency
                    </Button>
                  </Row>
                  <Spacer y={1}></Spacer>
                  <Row justify="center" align="right">
                    <Button
                      onClick={(e) => displaySection("disc")}
                      size="md"
                      auto
                      shadow
                      css={{ background: btn_back, width: "15vh" }}
                      className={styles.thirteen}
                    >
                      HDD
                    </Button>
                  </Row>
                  <Spacer y={1}></Spacer>
                  <Row justify="center" align="right">
                    <Button
                      onClick={(e) => displaySection("events")}
                      size="md"
                      auto
                      shadow
                      css={{ background: btn_back, width: "15vh" }}
                      className={styles.thirteen}
                    >
                      Events
                    </Button>
                  </Row>
                  <Spacer y={1}></Spacer>
                  <Row justify="center" align="right">
                    <Button
                      onClick={(e) => displaySection("arp")}
                      size="md"
                      auto
                      shadow
                      css={{ background: btn_back, width: "15vh" }}
                      className={styles.thirteen}
                    >
                      ARP
                    </Button>
                  </Row>
                  <Spacer y={1}></Spacer>
                  <Row justify="center" align="right">
                    <Button
                      onClick={(e) => displaySection("ports")}
                      size="md"
                      auto
                      shadow
                      css={{ background: btn_back, width: "15vh" }}
                      className={styles.thirteen}
                    >
                      Ports
                    </Button>
                  </Row>
                  <Spacer y={1}></Spacer>
                  <Row justify="center" align="right">
                    <Button
                      onClick={(e) => displaySection("baseline")}
                      size="md"
                      auto
                      shadow
                      css={{ background: btn_back, width: "15vh" }}
                      className={styles.thirteen}
                    >
                      Baseline
                    </Button>
                  </Row>
                  <Spacer y={1}></Spacer>
                  <Row justify="center" align="right">
                    <Button
                      onClick={openHandler_MSG}
                      size="md"
                      auto
                      shadow
                      css={{
                        background: "yellow",
                        width: "15vh",
                      }}
                      className={styles.thirteen}
                    >
                      Message
                    </Button>
                  </Row>
                  <Modal
                    closeButton
                    blur
                    aria-labelledby="modal-title_Reg"
                    open={visible_MSG}
                    onClose={closeHandler_MSG}
                    css={{
                      backgroundColor: "White",

                      backdropFilter: "blur(20px)",
                    }}
                  >
                    <Modal.Header>
                      <Text b size={24} css={{ color: "red" }}>
                        Message
                      </Text>
                    </Modal.Header>
                    <Card.Divider />
                    <Modal.Body>
                      {" "}
                      <form onSubmit={send_MSG}>
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
                            onPress={closeHandler_MSG}
                          >
                            Close
                          </Button>
                          <Button type="submit_dev_ID" auto>
                            OK
                          </Button>
                        </Modal.Footer>
                      </form>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                  </Modal>
                  <Spacer y={1}></Spacer>
                  <Row justify="center" align="right">
                    <Button
                      onClick={handler_Power}
                      size="md"
                      auto
                      shadow
                      css={{ background: "red", width: "15vh" }}
                      className={styles.thirteen}
                    >
                      Power
                    </Button>
                  </Row>
                  <Modal
                    closeButton
                    blur
                    aria-labelledby="modal-title_Reg"
                    open={visible_Reg}
                    onClose={closeHandler_Reg}
                  >
                    <Modal.Header>
                      <Text b size={24} css={{ color: "red" }}>
                        Power
                      </Text>
                    </Modal.Header>
                    <Card.Divider />
                    <Modal.Body></Modal.Body>
                    <Modal.Footer>
                      <Button
                        onClick={(e) => closeApp("PWR_MNG", "RESTART")}
                        auto
                        color="primary"
                        bordered
                        ghost
                      >
                        Restart
                      </Button>

                      <Button
                        ghost
                        onClick={(e) => closeApp("PWR_MNG", "SHUTDOWN")}
                        auto
                        color="error"
                        bordered
                      >
                        Shutdown
                      </Button>
                      <Button
                        ghost
                        onClick={(e) => closeApp("PWR_MNG", "CANCEL_SHUTDOWN")}
                        auto
                        color="warning"
                        bordered
                      >
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Spacer y={1}></Spacer>

                  {/*
           
                  
                  <Modal
                    scroll
                    blur
                    width="30%"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    open={visible_sendMsg}
                    onClose={closeHandler_sendMsg}
                  >
                    <Modal.Header>
                      <Text id="modal-title" size={18}>
                        Device
                      </Text>
                    </Modal.Header>
                    <form onSubmit={send_MSG}>
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
                          onPress={closeHandler_sendMsg}
                        >
                          Close
                        </Button>
                        <Button type="submit_dev_ID" auto>
                          OK
                        </Button>
                      </Modal.Footer>
                    </form>
                  </Modal>
           
           */}
                </Card.Body>
              </Card>
            </Container>
          </Grid>

          {/* ========================================================= Start chart row
           Start chart row     
               
          */}
          <div id="charts" style={{ width: "70%" }}>
            <Grid xs={12}>
              <Container>
                <Card css={{ $$cardColor: btn_back, h: "75vh" }}>
                  <Card.Body>
                    <Row justify="center" align="right">
                      <LineChart
                        syncId="anyId"
                        width={1150}
                        height={200}
                        data={latencyData}
                      >
                        <Line
                          type="monotone"
                          dataKey="locallatency"
                          stroke="red"
                          dot={false}
                          legendType="triangle"
                        />
                        <Line
                          type="monotone"
                          dataKey="publiclatency"
                          stroke="#8884d8"
                          dot={false}
                        />

                        <XAxis dataKey="created" tick={false} />
                        <YAxis dataKey="publiclatency" domain={[0, 100]} />
                        <Tooltip />
                        <Legend
                          layout="horizontal"
                          verticalAlign="top"
                          align="center"
                        />
                      </LineChart>
                    </Row>

                    <Row justify="center" align="right">
                      <LineChart
                        syncId="anyId"
                        width={1150}
                        height={200}
                        data={latencyData}
                      >
                        <Line
                          type="monotone"
                          dataKey="cpu"
                          stroke="red"
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="memory"
                          stroke="#8884d8"
                          dot={false}
                        />

                        <XAxis dataKey="created" tick={false} />
                        <YAxis dataKey="publiclatency" domain={[0, 100]} />
                        <Tooltip />
                        <Legend
                          layout="horizontal"
                          verticalAlign="top"
                          align="center"
                        />
                      </LineChart>
                    </Row>
                  </Card.Body>
                </Card>
                <Spacer y={1}></Spacer>
              </Container>
            </Grid>
          </div>

          {/* ========================================================= End chart row
           END chart row     
               
          */}
          <div id="disc" style={{ display: "none", width: "80%" }}>
            <Grid xs={12}>
              <Card css={{ h: "75vh", $$cardColor: btn_back, width: "100%" }}>
                <Card.Body>
                  {disc.map((item, index) => (
                    <Text h5 size={20} color={text_Color} css={{ m: 5 }}>
                      {item.fs} {formatBytes(item.size)} {item.uses} % used
                      <Progress
                        className={styles.thirteen}
                        css={{ display: "block" }}
                        value={item.uses}
                        shadow
                        color="primary"
                        status="primary"
                      />
                    </Text>
                  ))}
                </Card.Body>
              </Card>
            </Grid>
          </div>
          <div id="events" style={{ display: "none", width: "80%" }}>
            <Grid xs={12}>
              <Card
                css={{
                  h: "100vh",
                  $$cardColor: btn_back,
                  width: "100%",
                  overflowY: "visible",
                }}
              >
                <Card.Body>
                  <Table>
                    <Table.Header columns={columns_events}>
                      {(column) => (
                        <Table.Column key={column.key}>
                          {column.label}
                        </Table.Column>
                      )}
                    </Table.Header>
                    <Table.Body items={rows_events}>
                      {(item) => (
                        <Table.Row key={item.key}>
                          {(columnKey) => (
                            <Table.Cell>
                              <Text color={text_Color}> {item[columnKey]}</Text>
                            </Table.Cell>
                          )}
                        </Table.Row>
                      )}
                    </Table.Body>
                    <Table.Pagination
                      shadow
                      noMargin
                      align="center"
                      rowsPerPage={10}
                    />
                  </Table>
                </Card.Body>
              </Card>
            </Grid>
          </div>
          <div id="arp" style={{ display: "none", width: "80%" }}>
            <Grid xs={12}>
              <Card
                css={{
                  h: "100vh",
                  $$cardColor: btn_back,
                  width: "100%",
                  overflowY: "visible",
                }}
              >
                <Card.Body>
                  <Table>
                    <Table.Header columns={columns_arp}>
                      {(column) => (
                        <Table.Column key={column.key}>
                          {column.label}
                        </Table.Column>
                      )}
                    </Table.Header>
                    <Table.Body items={rows_arp}>
                      {(item) => (
                        <Table.Row key={item.key}>
                          {(columnKey) => (
                            <Table.Cell>
                              <Text color={text_Color}> {item[columnKey]}</Text>
                            </Table.Cell>
                          )}
                        </Table.Row>
                      )}
                    </Table.Body>
                    <Table.Pagination
                      shadow
                      noMargin
                      align="center"
                      rowsPerPage={10}
                      onPageChange={(page) => console.log({ page })}
                    />
                  </Table>
                </Card.Body>
              </Card>
            </Grid>
          </div>
          <div id="ports" style={{ display: "none", width: "80%" }}>
            <Grid xs={12}>
              <Card
                css={{
                  h: "100vh",
                  $$cardColor: btn_back,
                  width: "100%",
                  overflowY: "visible",
                }}
              >
                <Card.Body>
                  <Table>
                    <Table.Header columns={columns_port}>
                      {(column) => (
                        <Table.Column key={column.key}>
                          {column.label}
                        </Table.Column>
                      )}
                    </Table.Header>
                    <Table.Body items={rows_port}>
                      {(item) => (
                        <Table.Row key={item.key}>
                          {(columnKey) => (
                            <Table.Cell>
                              <Text color={text_Color}> {item[columnKey]}</Text>
                            </Table.Cell>
                          )}
                        </Table.Row>
                      )}
                    </Table.Body>
                    <Table.Pagination
                      shadow
                      noMargin
                      align="center"
                      rowsPerPage={10}
                      onPageChange={(page) => console.log({ page })}
                    />
                  </Table>
                </Card.Body>
              </Card>
            </Grid>
          </div>
          {/*=========================================================================================  Baseline */}
          <div id="baseline" style={{ display: "none", width: "80%" }}>
            {session.devices[`${currDev}`].baseline.map((baseline) => (
              <Grid.Container>
                <Grid xs={12}>
                  <Card
                    css={{ $$cardColor: btn_back }}
                    className={styles.thirteen}
                  >
                    <Spacer y={1}></Spacer>
                    <Text color={text_Color}>
                      Baseline for {baseline.defaultgateway} Gateway
                    </Text>

                    <Card.Body>
                      <Row justify="center" align="right">
                        <Card css={{ $$cardColor: btn_back }} xs={4}>
                          <Text h4 color={text_Color}>
                            RAM
                          </Text>

                          <Card.Body>
                            <Row justify="Left" align="right">
                              <Text color={text_Color}>
                                Total: {formatBytes(hw.totalmemory)}
                              </Text>{" "}
                            </Row>
                            <Row justify="Left" align="right">
                              <Text color={text_Color}>
                                Avg RAM usage: {baseline.memoryuses} %
                              </Text>
                            </Row>
                            <Row justify="Left" align="right">
                              <Text color={text_Color}>
                                Avg CPU usage: {baseline.cpuuses} %
                              </Text>
                            </Row>
                          </Card.Body>
                        </Card>
                        <Card css={{ $$cardColor: btn_back }} xs={4}>
                          <Text h4 color={text_Color}>
                            Addressing
                          </Text>
                          <Card.Body>
                            <Row justify="Left" align="right">
                              <Text color={text_Color}>
                                IPv4: {baseline.ipv4}
                              </Text>
                            </Row>
                            <Row justify="Left" align="right">
                              <Text color={text_Color}>
                                IPv4 Mask: {baseline.ipv4sub}
                              </Text>
                            </Row>
                            <Row justify="Left" align="right">
                              <Text color={text_Color}>
                                IPv6: {baseline.ipv6}
                              </Text>
                            </Row>
                            <Row justify="Left" align="right">
                              <Text color={text_Color}>
                                IPv6 Mask: {baseline.ipv6sub}
                              </Text>
                            </Row>
                          </Card.Body>
                        </Card>
                        <Card css={{ $$cardColor: btn_back }} xs={4}>
                          <Text h4 color={text_Color}>
                            NIC
                          </Text>
                          <Card.Body>
                            <Row justify="Left" align="right">
                              <Text color={text_Color}>
                                Interface: {baseline.iface} ({baseline.speed}
                                mb/s)
                              </Text>
                            </Row>

                            <Row justify="Left" align="right">
                              <Text color={text_Color}>
                                Iface MAC: {baseline.mac}
                              </Text>
                            </Row>
                          </Card.Body>
                        </Card>
                        <Card css={{ $$cardColor: btn_back }} xs={4}>
                          <Text h4 color={text_Color}>
                            Gateway
                          </Text>
                          <Card.Body>
                            <Row justify="Left" align="right">
                              <Text color={text_Color}>
                                Gateway: {baseline.defaultgateway}{" "}
                              </Text>
                            </Row>
                            <Row justify="Left" align="right">
                              <Text color={text_Color}>
                                Public IP: {baseline.publicip}{" "}
                              </Text>
                            </Row>
                            <Row justify="Left" align="right">
                              <Text color={text_Color}>
                                Avg Local Latency: {baseline.locallatency} ms
                              </Text>
                            </Row>
                            <Row justify="Left" align="right">
                              <Text color={text_Color}>
                                Avg Public Latency: {baseline.publiclatency} ms
                              </Text>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Row>
                      <Row>
                        <Card css={{ $$cardColor: btn_back }} xs={12}>
                          <Text h4 color={text_Color}>
                            Ports
                          </Text>
                          <Card.Body>
                            <Text color={text_Color}>
                              {baseline.ports.replaceAll(",", ", ")}{" "}
                            </Text>
                          </Card.Body>
                        </Card>
                      </Row>

                      <Row>
                        <Card css={{ $$cardColor: btn_back }} xs={12}>
                          <Text h4 color={text_Color}>
                            Neighbours
                          </Text>
                          <Card.Body>
                            <Text color={text_Color}>
                              {baseline.neighbours.replaceAll(",", ",\n ")}{" "}
                            </Text>
                          </Card.Body>
                        </Card>
                      </Row>
                      <Button
                        onClick={downloadCsv}
                        size="sm"
                        auto
                        shadow
                        css={{ background: "yellow", width: "50vh" }}
                        className={styles.thirteen}
                        justify="right"
                        align="right"
                      >
                        Export CSV
                      </Button>
                    </Card.Body>
                  </Card>
                </Grid>
                <Spacer y={3}></Spacer>
              </Grid.Container>
            ))}
          </div>
          <Snackbar
            TransitionComponent={TransitionLeft}
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={3000}
            message={message}
            color="warning"
          ></Snackbar>
        </Grid.Container>
      </main>
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(req) {
    const { client, pool } = require("./api/database/connections/connection");

    const id = req.query.devID;

    let ports = await pool.query(
      `select * from "${id}"."ports" ORDER BY created DESC; `
    );
    let events = await pool.query(
      `select * from "${id}"."events" ORDER BY created DESC LIMIT 100;  `
    );

    let networkstats = await pool.query(
      `select * from "${id}"."networkstats" ORDER BY created DESC LIMIT 1000 ; `
    );
    /*
    let hardware = await pool.query(
      `select * from "${id}"."hardware" ORDER BY created DESC LIMIT 1;   `
    );
*/
    let iface = await pool.query(
      `select * from "${id}"."networkinterface" ORDER BY created DESC LIMIT 1; `
    );

    let arp = await pool.query(
      `select * from "${id}"."arp" ORDER BY created DESC; `
    );
    let baseline = await pool.query(`select * from "${id}"."baseline"; `);

    let disc = await pool.query(
      `select * from "${id}"."disc" ORDER BY created ASC; `
    );
    let server = await pool.query(
      `select * from "${id}"."server" ORDER BY created DESC LIMIT 1; `
    );

    let devices = req.req.session.devices;
    req.req.session.devices[`${id}`].server = server.rows;

    await req.req.session.save();

    // req.req.session.devices[`${id}`].hardware = hardware.rows;
    req.req.session.devices[`${id}`].iface = iface.rows;

    req.req.session.devices[`${id}`].networkStats = networkstats.rows;
    req.req.session.devices[`${id}`].events = events.rows;
    req.req.session.devices[`${id}`].arp = arp.rows;
    req.req.session.devices[`${id}`].baseline = baseline.rows;
    req.req.session.devices[`${id}`].disc = disc.rows;
    req.req.session.devices[`${id}`].ports = ports.rows;

    return {
      props: {
        session: JSON.stringify(req.req.session),
        currDev: id,
        // hardware: JSON.stringify(hardware.rows[0]),
        // iface: JSON.stringify(iface.rows[0]),
        //  events: JSON.stringify(events.rows[0]),
        //  devices: JSON.stringify(devices.rows),
        //  networkstats: JSON.stringify(networkstats.rows),
      },
    };
  },
  ironOptions
);
