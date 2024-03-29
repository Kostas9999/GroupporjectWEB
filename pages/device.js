import Head from "next/head";
import Footer from "./templates/footer";
import { ironOptions } from "./api/session/session_Config";
import { withIronSessionSsr } from "iron-session/next";

import Navbar from "./templates/navbar/navbar";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { NotificationIcon } from "../public/img/js/notification";
import { useState, useEffect } from "react";

import { Snackbar, Slide, Alert } from "@mui/material";

import { useRouter } from "next/router";

import { NextUIProvider, useModal } from "@nextui-org/react";
import styles from "../styles/Home.module.css";

const json2csv = require("json2csv");

import {
  Badge,
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
  Popover,
  Trigger,
} from "@nextui-org/react";
let message = "";
let newActiveData = {};
let lastKnownEvent = 0;
let event_data = [];
export default function Home({ all, currDev, hw }) {
  all = JSON.parse(all);
  if (lastKnownEvent == 0) {
    lastKnownEvent = all.devices[currDev].events[0].event_id;
  }

  let user = all.user;
  isNewEvents();
  async function isNewEvents() {
    const endpoint = `${all.env.host}/api/database/queries/getLastEvent`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currDev }),
    };
    try {
      const response = await fetch(endpoint, options);
      const result = await response.json();
      if (result.event.event_id !== lastKnownEvent) {
        notification(
          `Event: ${result.event.type} Value:${result.event.value} `
        );

        lastKnownEvent = result.event.event_id;
        refresh();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function adoptHours(oldDataTime, offsetHours) {
    let mls = new Date(oldDataTime);
    return mls.setHours(mls.getHours() + offsetHours);
  }

  function isOnline(strDate) {
    return Date.now() - adoptHours(strDate, 0) > 30000;
  }

  function dateTimeFormater(datetime) {
    if (datetime === undefined) {
      return "";
    }
    return datetime.replaceAll("T", " ").substring(1, 20);
  }

  async function getActiveData() {
    const endpoint = `${all.env.host}/api/database/queries/getActiveData`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currDev }),
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    newActiveData = result.data;
  }

  const [data, setData] = useState(all.devices[currDev].networkStats);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await getActiveData();
      data.shift();

      setData([...data, newActiveData]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [data]);

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

  let disc = all.devices[`${currDev}`].disc;
  let arp = all.devices[`${currDev}`].arp;
  let ports = all.devices[`${currDev}`].ports;

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

  let keys_port = Object.keys(ports[0]);
  keys_port.push("action");

  const columns_port = [];
  keys_port.map((item, index) =>
    columns_port.push({
      key: item,
      label: item,
    })
  );
  /*
  dateTimeFormater(
    JSON.stringify(
      new Date(adoptHours(
        item.created
        
        , 1))
    )
  )
*/

  const rows_port = [];
  ports.map((item, index) =>
    rows_port.push({
      key: index,
      port: item.port,
      processname: item.processname,
      pid: item.pid,
      processpath: item.processpath,
      created: dateTimeFormater(
        JSON.stringify(new Date(adoptHours(item.created, 1)))
      ),
      action: (
        <Button
          onPress={(e) => closeApp("PRT_CLOSE", item.pid)}
          auto
          ghost
          color="error"
          bordered
          //   disabled={isOnline(item.created)}
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
      created: dateTimeFormater(
        JSON.stringify(new Date(adoptHours(item.created, 1)))
      ),
    })
  );

  let keys;
  all.devices[`${currDev}`].events.map(
    (item, index) => (keys = Object.keys(item))
  );

  if (keys === undefined) {
    keys = ["none"];
  }
  keys.push("action");

  const columns_events = [];
  keys.map((item, index) =>
    columns_events.push({
      key: item,
      label: item,
    })
  );

  const rows_events = [];
  all.devices[`${currDev}`].events.map((item, index) =>
    rows_events.push({
      key: item.event_id,
      event_id: item.event_id,
      type: item.type,
      value: item.value,
      baseline: item.baseline,

      created: dateTimeFormater(
        JSON.stringify(new Date(adoptHours(item.created, 1)))
      ),
      action: (
        <Button
          onPress={(e) => {
            getEventData(item);
            setVisible(true);
          }}
          auto
          ghost
          color="error"
          bordered
        >
          Details
        </Button>
      ),
    })
  );

  function getEventData(item) {
    let mls = new Date(item.created);
    let offset9Sec = mls.setSeconds(mls.getSeconds() + 9);

    var result = all.devices[currDev].networkStats.filter((obj) => {
      if (new Date(obj.created) <= offset9Sec) {
        // TODO: if not on list request from database
        return obj;
      }
    });

    let singleRes = result[result.length - 1];

    setEvent_data2({ singleRes, item });

    return { singleRes, item };
  }

  const [event_data2, setEvent_data2] = useState([]);

  const handleSelect = (e) => {
    router.push({
      pathname: "/device",
      query: { devID: e },
    });
  };

  //  setInterval(refresh, 10000);

  async function refresh() {
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

  const latencyData = all.devices[`${currDev}`].networkStats.reverse();
  const [visible_Reg, setVisible_Power] = React.useState(false);
  const handler_Power = () => setVisible_Power(true);

  const closeHandler_Reg = () => {
    setVisible_Power(false);
  };

  const [visible_MSG, setVisible_MSG] = React.useState(false);
  const openHandler_MSG = () => setVisible_MSG(true);
  const closeHandler_MSG = () => setVisible_MSG(false);

  const { setVisible, bindings } = useModal();

  //==================================================== export

  function downloadCsv() {
    const element = document.createElement("a");

    element.setAttribute(
      "href",
      `data:text/csv;charset=utf-8,${json2csv.parse(
        all.devices[`${currDev}`].baseline
      )}`
    );
    element.setAttribute("download", `Baseline_${currDev}`);
    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  function exportNetStats() {
    const element = document.createElement("a");

    element.setAttribute(
      "href",
      `data:text/csv;charset=utf-8,${json2csv.parse(
        all.devices[`${currDev}`].networkStats
      )}`
    );
    element.setAttribute("download", `NetStats_${currDev}`);
    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function exportHdd() {
    const element = document.createElement("a");

    element.setAttribute(
      "href",
      `data:text/csv;charset=utf-8,${json2csv.parse(
        all.devices[`${currDev}`].disc
      )}`
    );
    element.setAttribute("download", `HDD_${currDev}`);
    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function exportEvents() {
    const element = document.createElement("a");

    element.setAttribute(
      "href",
      `data:text/csv;charset=utf-8,${json2csv.parse(
        all.devices[`${currDev}`].events
      )}`
    );
    element.setAttribute("download", `Events ${currDev}`);
    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function exportPorts() {
    const element = document.createElement("a");

    element.setAttribute(
      "href",
      `data:text/csv;charset=utf-8,${json2csv.parse(
        all.devices[`${currDev}`].ports
      )}`
    );
    element.setAttribute("download", `Ports_${currDev}`);
    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function exportArp() {
    const element = document.createElement("a");

    element.setAttribute(
      "href",
      `data:text/csv;charset=utf-8,${json2csv.parse(
        all.devices[`${currDev}`].arp
      )}`
    );
    element.setAttribute("download", `ARP_${currDev}`);
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
          <div>
            <Modal
              scroll
              width="600px"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
              {...bindings}
            >
              <Modal.Header>
                <Text id="modal-title" size={20}>
                  Type: {event_data2?.item?.type} {" | "}
                  Value:
                  {event_data2?.item?.value}
                  {" | "}
                  Baseline:
                  {event_data2?.item?.baseline}
                  {" | "}
                  <br></br>
                  Date:
                  {dateTimeFormater(
                    JSON.stringify(
                      new Date(adoptHours(event_data2?.item?.created, 1))
                    )
                  )}
                </Text>
              </Modal.Header>
              <Modal.Body>
                <Text justify="center" id="modal-title" size={18}>
                  Interface: {event_data2?.singleRes?.iface}
                  {" | "}
                  Public IP: {event_data2?.singleRes?.publicip}
                  {" | "}
                  defaultgateway: {event_data2?.singleRes?.defaultgateway}
                  <br></br>
                  locallatency: {event_data2?.singleRes?.locallatency}
                  {" | "}
                  publiclatency: {event_data2?.singleRes?.publiclatency}
                  {" | "}
                  <br></br>
                  CPU: {event_data2?.singleRes?.cpu}
                  {" | "}
                  RAM: {event_data2?.singleRes?.memory}
                  {" | "}
                  <br></br>
                  rx_dropped: {event_data2?.singleRes?.rx_dropped}
                  {" | "}
                  rx_error: {event_data2?.singleRes?.rx_error}
                  {" | "}
                  tx_dropped: {event_data2?.singleRes?.tx_dropped}
                  {" | "}
                  tx_dropped: {event_data2?.singleRes?.tx_error}
                  {" | "}
                </Text>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  auto
                  flat
                  color="error"
                  onPress={() => setVisible(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <Grid xs={12}>
            <Container>
              <Card css={{ $$cardColor: btn_back }} className={styles.thirteen}>
                <Card.Body>
                  <Row justify="center" align="right">
                    {!isOnline(data.slice(-1)[0].created) ? (
                      <Badge
                        style={{ marginRight: "10px" }}
                        enableShadow
                        disableOutline
                        color="success"
                        content="Online"
                        placement="center-left"
                      ></Badge>
                    ) : (
                      <Badge
                        style={{ marginRight: "10px" }}
                        enableShadow
                        disableOutline
                        color="error"
                        content="Online"
                        placement="center-left"
                      ></Badge>
                    )}
                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                      Last Seen:{" "}
                      {
                        dateTimeFormater(
                          JSON.stringify(
                            new Date(adoptHours(data.slice(-1)[0].created, 1))
                          )
                        )

                        // dateTimeFormater(data.slice(-1)[0].created)
                      }
                      <Spacer y={0}></Spacer>
                      {data.created}
                      <Spacer y={0}></Spacer>
                      {all.devices[`${currDev}`].os.hostname}
                      <Spacer y={0}></Spacer>
                      {all.devices[`${currDev}`].os.version}
                      <Spacer y={0}></Spacer>
                      {all.devices[`${currDev}`].os.relese} (
                      {all.devices[`${currDev}`].os.build})
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
                      {hw[0].title}
                      <Spacer y={0}></Spacer>
                      RAM: {formatBytes(Math.ceil(hw[0].totalmemory))}
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
                      {all.devices[`${currDev}`].iface[0].iface}
                      {"   \t "}
                      {all.devices[`${currDev}`].iface[0].speed}(mb/s)
                      <Spacer y={0}></Spacer>
                      MAC: {all.devices[`${currDev}`].iface[0].mac}
                      <Spacer y={0}></Spacer>
                      IPv4: {all.devices[`${currDev}`].iface[0].ipv4}
                      <Spacer y={0}></Spacer>
                      IPv4Sub: {all.devices[`${currDev}`].iface[0].ipv4sub}
                      <Spacer y={0}></Spacer>
                      IPv6: {all.devices[`${currDev}`].iface[0].ipv6}
                      <Spacer y={0}></Spacer>
                      IPv6Sub: {all.devices[`${currDev}`].iface[0].ipv6sub}
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
                      rx_total: {formatBytes(data.slice(-1)[0].rx_total)}
                      <Spacer y={0}></Spacer>
                      rx_error: {formatBytes(data.slice(-1)[0].rx_error)}
                      <Spacer y={0}></Spacer>
                      rx_dropped: {formatBytes(data.slice(-1)[0].rx_dropped)}
                      <Spacer y={0}></Spacer>
                      tx_total: {formatBytes(data.slice(-1)[0].tx_total)}
                      <Spacer y={0}></Spacer>
                      tx_error: {formatBytes(data.slice(-1)[0].tx_error)}
                      <Spacer y={0}></Spacer>
                      tx_dropped: {formatBytes(data.slice(-1)[0].tx_dropped)}
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
                      Local Latency: {data.slice(-1)[0].locallatency}ms
                      <Spacer y={0}></Spacer>
                      Public Latency: {data.slice(-1)[0].publiclatency}
                      ms
                      <Spacer y={0}></Spacer>
                      Gateway:
                      {data.slice(-1)[0].defaultgateway}
                      <Spacer y={0}></Spacer>
                      Gateway MAC:
                      {data.slice(-1)[0].dgmac}
                      <Spacer y={0}></Spacer>
                      Server: {all.devices[`${currDev}`]?.server[0]?.ip} (
                      {all.devices[`${currDev}`]?.server[0]?.port})
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
                        {Object.keys(all.devices).map((device) => (
                          <Dropdown.Item key={device}>
                            {all.devices[`${device}`].os.hostname}
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
          <div id="charts" style={{ width: "80%", height: "30vh" }}>
            <ResponsiveContainer>
              <LineChart syncId="anyId" data={data}>
                <Line
                  isAnimationActive={false}
                  type="monotone"
                  dataKey="locallatency"
                  stroke="red"
                  dot={false}
                />
                <Line
                  isAnimationActive={false}
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
            </ResponsiveContainer>

            <ResponsiveContainer>
              <LineChart syncId="anyId" width={800} height={300} data={data}>
                <Line
                  isAnimationActive={false}
                  type="monotone"
                  dataKey="cpu"
                  stroke="red"
                  dot={false}
                />
                <Line
                  isAnimationActive={false}
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
            </ResponsiveContainer>
            <Button
              onClick={exportNetStats}
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
                <Button
                  onClick={exportHdd}
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
              </Card>
            </Grid>
          </div>
          <div id="events" style={{ display: "none", width: "80%" }}>
            <Grid xs={12}>
              <Card
                css={{
                  $$cardColor: btn_back,

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
                              <Text color={text_Color}>
                                {" "}
                                {item[columnKey].length > 30
                                  ? ""
                                  : item[columnKey]}
                              </Text>
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
                  <Button
                    onClick={exportEvents}
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
                  <Button
                    onClick={exportArp}
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
          </div>
          <div id="ports" style={{ display: "none", width: "80%" }}>
            <Grid xs={12}>
              <Card
                css={{
                  h: "100%",
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
                              <Text color={text_Color}>
                                {" "}
                                {item[columnKey].length > 80 ? (
                                  <Popover>
                                    <Popover.Trigger>
                                      <Button auto ghost size="xs">
                                        view path
                                      </Button>
                                    </Popover.Trigger>
                                    <Popover.Content>
                                      <Text size={20}>{item[columnKey]}</Text>
                                    </Popover.Content>
                                  </Popover>
                                ) : (
                                  item[columnKey]
                                )}
                              </Text>
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
                <Button
                  onClick={exportPorts}
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
              </Card>
            </Grid>
          </div>
          {/*=========================================================================================  Baseline */}
          <div id="baseline" style={{ display: "none", width: "80%" }}>
            {all.devices[`${currDev}`].baseline.map((baseline) => (
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
                                Total:{" "}
                                {formatBytes(Math.ceil(hw[0].totalmemory))}
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
            severity="success"
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              {message}
            </Alert>
          </Snackbar>
        </Grid.Container>
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(req) {
    if (
      req?.req?.session?.user?.user_id === undefined ||
      !Object.keys(req.req.session.devices).includes(req.query.devID)
    ) {
      return {
        notFound: true,
      };
    }

    const { client, pool } = require("./api/database/connections/connection");

    const id = req.query.devID;

    let ports = await client.query(
      `select * from "${id}"."ports" ORDER BY created DESC; `
    );
    let events = await client.query(
      `select * from "${id}"."events" ORDER BY created DESC LIMIT 1000;  `
    );

    let networkstats = await pool.query(
      `select * FROM "${id}"."networkstats" ORDER BY created DESC LIMIT 500 ; `
    );

    let hardware = await pool.query(
      `select * from "${id}"."hardware" ORDER BY created DESC LIMIT 1;   `
    );

    let iface = await client.query(
      `select * from "${id}"."networkinterface" ORDER BY created DESC LIMIT 1; `
    );

    let arp = await client.query(
      `select * from "${id}"."arp" ORDER BY created DESC; `
    );
    let baseline = await client.query(`select * from "${id}"."baseline"; `);

    let disc = await client.query(
      `select * from "${id}"."disc" ORDER BY created ASC; `
    );
    let server = await client.query(
      `select * from "${id}"."server" ORDER BY created DESC LIMIT 1; `
    );
    let user = await client.query(`select * from "${id}"."user"  LIMIT 1; `);

    let devices = req.req.session.devices;
    req.req.session.devices[`${id}`].server = server.rows;

    await req.req.session.save();
    req.req.session.devices[`${id}`].user = user.rows;
    //  req.req.session.devices[`${id}`].hardware = hardware.rows;
    req.req.session.devices[`${id}`].iface = iface.rows;
    req.req.session.devices[`${id}`].networkStats = networkstats.rows;
    req.req.session.devices[`${id}`].events = events.rows;
    req.req.session.devices[`${id}`].arp = arp.rows;
    req.req.session.devices[`${id}`].baseline = baseline.rows;
    req.req.session.devices[`${id}`].disc = disc.rows;
    req.req.session.devices[`${id}`].ports = ports.rows;

    delete hardware.rows[0].created;
    return {
      props: {
        all: JSON.stringify(req.req.session),
        currDev: id,
        hw: hardware.rows,
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
