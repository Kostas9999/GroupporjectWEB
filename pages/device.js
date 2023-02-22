import Head from "next/head";
import { ironOptions } from "./api/session/session_Config";
import { withIronSessionSsr } from "iron-session/next";

import Navbar from "./templates/navbar/navbar";
import React, { PureComponent } from "react";
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useRouter } from "next/router";

import { NextUIProvider } from "@nextui-org/react";
import styles from "../styles/Home.module.css";

import {
  Dropdown,
  Text,
  Col,
  Row,
  Table,
  Container,
  Spacer,
  Card,
  Grid,
  Button,
  Modal,
  useAsyncList,
  useCollator,
} from "@nextui-org/react";

export default function Home({ all, currDev }) {
  all = JSON.parse(all);

  //console.log(all.devices[`${currDev}`].networkStats);

  const router = useRouter();
  const text_Color = "rgba(255, 255, 255, 0.9)"; // white smoke
  const btn_top_back = "rgba(255, 0, 0, 0.6)"; //red
  const btn_back = "rgba(0, 0, 0, .6)"; // black
  const card_back = "rgba(100, 100, 100, .6)"; // blue

  const handleSelect = (e) => {
    router.push({
      pathname: "/device",
      query: { devID: e },
    });
  };
  const MockItem = ({ text }) => {
    return (
      <Card css={{ h: "$20", $$cardColor: "$colors$primary" }}>
        <Card.Body>
          <Text h6 size={15} color="white" css={{ m: 0 }}>
            {text}
          </Text>
        </Card.Body>
      </Card>
    );
  };

  const latencyData = all.devices[`${currDev}`].networkStats;

  return (
    <NextUIProvider>
      <Head>
        <title>NetMon</title>
        <meta name="description" content="Monitoring Tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar />

        <Spacer y={1}></Spacer>

        <Grid.Container gap={2} justify="left">
          {/* ========================================================= Start First row
           Start first row         
          */}
          <Grid xs={2}>
            {/* ==================================================== Dropdown Start
          Dropdown menu to select Device
           */}
            <Row gap={1} justify="left">
              {
                <Dropdown>
                  <Dropdown.Button
                    size="md"
                    auto
                    shadow
                    css={{ background: btn_back }}
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

            {/* ==================================================== Dropdown end
          END Dropdown menu to select Device
           */}
          </Grid>
          <Grid xs={10}>
            <Container s>
              <Card css={{ $$cardColor: btn_back }}>
                <Card.Body>
                  <Row justify="center" align="right">
                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                      {all.devices[`${currDev}`].os.hostname}
                      <Spacer y={0}></Spacer>
                      {all.devices[`${currDev}`].os.version}
                      <Spacer y={0}></Spacer>
                      {all.devices[`${currDev}`].os.relese} ({" "}
                      {all.devices[`${currDev}`].os.build})
                    </Text>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
            <Container>
              <Card css={{ $$cardColor: btn_back }}>
                <Card.Body>
                  <Row justify="center" align="right">
                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                      {all.devices[`${currDev}`].hardware[0].title}
                      <Spacer y={0}></Spacer>
                      RAM: {all.devices[`${currDev}`].hardware[0].totalmemory}
                      <Spacer y={0}></Spacer>
                    </Text>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
            <Container>
              <Card css={{ $$cardColor: btn_back }}>
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
              <Card css={{ $$cardColor: btn_back }}>
                <Card.Body>
                  <Row justify="center" align="right">
                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                      rx_total:{" "}
                      {all.devices[`${currDev}`].networkStats[0].rx_total}
                      <Spacer y={0}></Spacer>
                      rx_error:{" "}
                      {all.devices[`${currDev}`].networkStats[0].rx_error}
                      <Spacer y={0}></Spacer>
                      rx_dropped:{" "}
                      {all.devices[`${currDev}`].networkStats[0].rx_dropped}
                      <Spacer y={0}></Spacer>
                      tx_total:{" "}
                      {all.devices[`${currDev}`].networkStats[0].tx_total}
                      <Spacer y={0}></Spacer>
                      tx_error:{" "}
                      {all.devices[`${currDev}`].networkStats[0].tx_error}
                      <Spacer y={0}></Spacer>
                      tx_dropped:{" "}
                      {all.devices[`${currDev}`].networkStats[0].tx_dropped}
                    </Text>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
            <Container>
              <Card css={{ $$cardColor: btn_back }}>
                <Card.Body>
                  <Row justify="center" align="right">
                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                      Local Latency:{" "}
                      {all.devices[`${currDev}`].networkStats[0].locallatency}ms
                      <Spacer y={0}></Spacer>
                      Public Latency:{" "}
                      {all.devices[`${currDev}`].networkStats[0].publiclatency}
                      ms
                      <Spacer y={0}></Spacer>
                      Gateway:
                      {all.devices[`${currDev}`].networkStats[0].defaultgateway}
                      <Spacer y={0}></Spacer>
                      Gateway MAC:
                      {all.devices[`${currDev}`].networkStats[0].dgmac}
                    </Text>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
          </Grid>

          {/* ========================================================= End First row
           END first row         
          */}
          {/* ========================================================= Start second row
           Start second row         
          */}
          <Grid xs={2}>
            <Container hidden>
              <Card
                css={{
                  $$cardColor: btn_back,
                  h: "50vh",
                }}
              >
                <Card.Body>
                  <Row justify="center" align="right">
                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                      Some Button
                    </Text>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
          </Grid>
          <Grid xs={10}>
            <Container>
              <Card css={{ $$cardColor: btn_back, h: "30vh" }}>
                <Card.Body>
                  <Text h6 size={15} color="red" css={{ m: 0 }}>
                    Local Latency
                  </Text>
                  <Spacer y={0}></Spacer>
                  <Text h6 size={15} color="blue" css={{ m: 0 }}>
                    Public Latency
                  </Text>
                  <Row justify="center" align="right">
                    <LineChart width={1000} height={200} data={latencyData}>
                      <Line
                        type="monotone"
                        dataKey="locallatency"
                        stroke="red"
                      />
                      <Line
                        type="monotone"
                        dataKey="publiclatency"
                        stroke="#8884d8"
                      />

                      <XAxis dataKey="created" />
                      <YAxis dataKey="publiclatency" />
                      <Tooltip />
                    </LineChart>
                  </Row>
                </Card.Body>
              </Card>
              <Spacer y={1}></Spacer>
              <Card css={{ $$cardColor: btn_back, h: "50vh" }}>
                <Card.Body>
                  <Text h6 size={15} color="blue" css={{ m: 0 }}>
                    Downloaded
                  </Text>{" "}
                  <Spacer y={0}></Spacer>
                  <Text h6 size={15} color="red" css={{ m: 0 }}>
                    Uploaded
                  </Text>
                  <Row justify="center" align="right">
                    <BarChart width={1000} height={200} data={latencyData}>
                      <Bar dataKey="rx_total" fill="#8884d8" />
                      <Bar dataKey="tx_total" fill="red" />
                      <XAxis dataKey="created" />
                      <Tooltip />
                    </BarChart>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
          </Grid>

          {/* ========================================================= End second row
           END second row         
          */}
          <Grid xs={3}>
            <MockItem text="1 of 4" />
          </Grid>
          <Grid xs={3}>
            <MockItem text="2 of 4" />
          </Grid>
          <Grid xs={3}>
            <MockItem text="3 of 4" />
          </Grid>
          <Grid xs={3}>
            <MockItem text="4 of 4" />
          </Grid>
          <Grid xs={3}>
            <MockItem text="1 of 3" />
          </Grid>
          <Grid xs={6}>
            <MockItem text="2 of 3" />
          </Grid>
          <Grid xs={3}>
            <MockItem text="3 of 3" />
          </Grid>
        </Grid.Container>

        <Container gap={0}>
          <Spacer y={1} />

          {/*
          <Row gap={1}>
            <Col>
              <Card
                css={{
                  backgroundColor: card_back,
                  mw: "100%",
                }}
              >
                <Card.Body css={{ padding: "2px" }}>
                  <Button
                    shadow
                    size="xl"
                    id="getDeviceID"
                    auto
                    css={{ background: btn_back }}
                    onPress={handler_getDeviceID}
                  >
                    <Text
                      h6
                      size={14}
                      css={{
                        color: text_Color,
                        m: 0,
                        "line-height": "1rem",
                      }}
                    >
                      {os.hostname} <br></br>
                      {os.version} ({os.build}) <br></br>
                      CPU: {hardware.Title} <br></br>
                      RAM:{" "}
                      {Math.round(hardware.TotalMemory / 1024 / 1024 / 1024)}
                      GB
                    </Text>
                  </Button>
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
                    <Modal.Body>
                      <Text id="modal-description">
                        ID: {hardware.id} <br></br>
                        Member since: {os.Created}
                        <br></br>
                        Hostname: {os.hostname} <br></br>
                        OS: {os.version} ({os.build}) <br></br>
                        Relese: {os.relese}
                        <br></br>
                        CPU: {hardware.Title} <br></br>
                        RAM:{" "}
                        {Math.round(hardware.TotalMemory / 1024 / 1024 / 1024)}
                        GB <br></br>
                      </Text>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        auto
                        flat
                        color="error"
                        onClick={closeHandler_getDeviceID}
                      >
                        Close
                      </Button>
                      <Button auto onClick={closeHandler_getDeviceID}>
                        OK
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Spacer y={1} />
          <Row gap={1}>
            <Col>
              <Card css={{ backgroundColor: card_back, mw: "100%" }}>
                <Card.Body css={{ padding: "2px" }}>
                  <Button
                    size="xl"
                    id="getDeviceID"
                    auto
                    shadow
                    css={{ background: btn_back }}
                    onClick={handler_netStats}
                  >
                    <Text
                      h6
                      size="$xs"
                      color={text_Color}
                      css={{ m: 0, "line-height": "1rem" }}
                    >
                      Network Stats <br></br>
                      Local Latency: {networkstats.localLatency}ms <br></br>
                      Public Latency: {networkstats.publicLatency}ms
                    </Text>
                  </Button>
                  <Modal
                    scroll
                    blur
                    closeButton
                    width="30%"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    open={visible_netStats}
                    onClose={closeHandler_netStats}
                  >
                    <Modal.Header>
                      <Text id="modal-title" size={18}>
                        Net Stats
                      </Text>
                    </Modal.Header>
                    <Modal.Body>
                      <Text id="modal-description">
                        Interface: {networkstats.interface}
                        <br></br>
                        <br></br>
                        Local Latency: {networkstats.localLatency}ms <br></br>
                        Public Latency: {networkstats.publicLatency}ms
                        <br></br>
                        <br></br>
                        rx_total: {networkstats.rx_total} <br></br>
                        rx_dropped: {networkstats.rx_dropped} <br></br>
                        rx_error: {networkstats.rx_error} <br></br>
                        <br></br>
                        tx_total: {networkstats.tx_total} <br></br>
                        tx_dropped: {networkstats.tx_dropped} <br></br>
                        tx_error: {networkstats.tx_error} <br></br>
                      </Text>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        auto
                        flat
                        color="error"
                        onClick={closeHandler_netStats}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card css={{ backgroundColor: card_back, mw: "100%" }}>
                <Card.Body css={{ padding: "2px" }}>
                  <Button
                    size="xl"
                    id="getDeviceID"
                    auto
                    shadow
                    css={{ background: btn_back }}
                    onClick={handler_iface}
                  >
                    <Text
                      h6
                      size="$xs"
                      color={text_Color}
                      css={{ m: 0, "line-height": "1rem" }}
                    >
                      {iface.iface} ({iface.speed}mb/s)<br></br>
                      {iface.mac}
                      <br></br>
                      {iface.IPv4}
                      <br></br>
                      {iface.IPv6}
                    </Text>
                  </Button>
                  <Modal
                    scroll
                    closeButton
                    blur
                    width="30%"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    open={visible_iface}
                    onClose={closeHandler_iface}
                  >
                    <Modal.Header>
                      <Text id="modal-title" size={18}>
                        Network Interface
                      </Text>
                    </Modal.Header>
                    <Modal.Body>
                      <Text id="modal-description">
                        Interface: {iface.iface} <br></br>
                        Speed: {iface.speed}mb/s<br></br>
                        MAC: {iface.mac}
                        <br></br>
                        <br></br>
                        IPv4<br></br>
                        {iface.IPv4}
                        <br></br>
                        {iface.IPv4Sub}
                        <br></br>
                        <br></br>
                        IPv6<br></br>
                        {iface.IPv6}
                        <br></br>
                        {iface.IPv6Sub}
                        <br></br>
                      </Text>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        auto
                        flat
                        color="error"
                        onClick={closeHandler_iface}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Card.Body>
              </Card>
            </Col>
          </Row>
                    */}
        </Container>
      </main>
    </NextUIProvider>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(req) {
    const { client, pool } = require("./api/database/connections/connection");
    const id = req.query.devID;

    let ports = await client.query(`select * from "${id}"."ports"; `);
    let events = await client.query(
      `select * from "${id}"."events" LIMIT 100;  `
    );

    let networkstats = await pool.query(
      `select * from "${id}"."networkstats" LIMIT 1000; `
    );

    let hardware = await pool.query(
      `select * from "${id}"."hardware" LIMIT 1;   `
    );

    let iface = await client.query(
      `select * from "${id}"."networkinterface"  LIMIT 1; `
    );

    let arp = await client.query(`select * from "${id}"."arp"; `);
    let baseline = await client.query(`select * from "${id}"."baseline"; `);
    let disc = await client.query(`select * from "${id}"."disc"; `);
    let user = await client.query(`select * from "${id}"."user"  LIMIT 1; `);

    let devices = req.req.session.devices;
    req.req.session.devices[`${id}`].hardware = hardware.rows;
    req.req.session.devices[`${id}`].iface = iface.rows;
    req.req.session.devices[`${id}`].networkStats = networkstats.rows;
    req.req.session.devices[`${id}`].events = events.rows;
    req.req.session.devices[`${id}`].arp = arp.rows;
    req.req.session.devices[`${id}`].baseline = baseline.rows;
    req.req.session.devices[`${id}`].disc = disc.rows;
    req.req.session.devices[`${id}`].ports = ports.rows;
    req.req.session.devices[`${id}`].user = user.rows;

    return {
      props: {
        all: JSON.stringify(req.req.session),
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
