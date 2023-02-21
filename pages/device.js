import Head from "next/head";
import { ironOptions } from "./api/session/session_Config";
import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import Navbar from "./templates/navbar/navbar";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
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
  Button,
  Modal,
  useAsyncList,
  useCollator,
} from "@nextui-org/react";

export default function Home({ os, hardware, iface }) {
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

  const [visible_getDeviceID, setVisible_Login] = React.useState(false);
  const handler_getDeviceID = () => setVisible_Login(true);
  const closeHandler_getDeviceID = () => {
    setVisible_Login(false);
  };

  const [visible_Ports, setVisible_Ports] = React.useState(false);
  const handler_Ports = () => setVisible_Ports(true);
  const closeHandler_Ports = () => {
    setVisible_Ports(false);
  };

  const [visible_iface, setVisible_iface] = React.useState(false);
  const handler_iface = () => setVisible_iface(true);
  const closeHandler_iface = () => {
    setVisible_iface(false);
  };

  const [visible_netStats, setVisible_netStats] = React.useState(false);
  const handler_netStats = () => setVisible_netStats(true);
  const closeHandler_netStats = () => {
    setVisible_netStats(false);
  };

  let keys;
  ports.map((item, index) => (keys = Object.keys(item)));

  const columns = [];
  keys.map((item, index) =>
    columns.push({
      key: item,
      label: item,
    })
  );

  columns.push({
    key: "IANA",
    label: "IANA",
  });

  const rows = [];
  ports.map((item, index) =>
    rows.push({
      key: index,
      Created: item.Created,
      port: item.port,
      process: item.process,
      pid: item.pid,
      path: item.path,
      IANA: "TODO",
    })
  );

  const collator = useCollator({ numeric: true });
  function load() {
    return {
      items: rows,
    };
  }

  async function sort({ items, sortDescriptor }) {
    return {
      items: items.sort((a, b) => {
        let first = a[sortDescriptor.column];
        let second = b[sortDescriptor.column];
        let cmp = collator.compare(first, second);
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      }),
    };
  }

  const list = useAsyncList({ load, sort });

  return (
    <NextUIProvider>
      <main className={styles.main}>
        <Navbar />
        <Head>
          <title>NetMon</title>
          <meta name="description" content="Monitoring Tool" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Spacer y={1}></Spacer>

        <Container gap={0}>
          <Row gap={1}>
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
                  {devices.map((a) => (
                    <Dropdown.Item key={a.OS.id}>{a.OS.hostname}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            }
          </Row>
          <Spacer y={1} />

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

            <Col>
              <Card css={{ backgroundColor: card_back, mw: "100%" }}>
                <Card.Body css={{ padding: "2px" }}>
                  <Button
                    size="xl"
                    id="getDeviceID"
                    auto
                    shadow
                    css={{ background: btn_back }}
                    onClick={handler_Ports}
                  >
                    <Text h6 size={14} color={text_Color} css={{ m: 0 }}>
                      Open Ports (Listening): {ports.length}
                    </Text>
                  </Button>
                  <Modal
                    scroll
                    fullScreen
                    closeButton
                    blur
                    width="30%"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    open={visible_Ports}
                    onClose={closeHandler_Ports}
                  >
                    <Modal.Header>
                      <Text id="modal-title" size={18}>
                        Open Ports
                      </Text>
                    </Modal.Header>
                    <Modal.Body>
                      <Text id="modal-description">
                        <Table
                          bordered
                          aria-label="Example static collection table"
                          css={{
                            minWidth: "90%",
                            height: "calc($space$14 * 10)",
                          }}
                          sortDescriptor={list.sortDescriptor}
                          onSortChange={list.sort}
                        >
                          <Table.Header columns={columns}>
                            {(column) => (
                              <Table.Column key={column.key} allowsSorting>
                                {column.label}
                              </Table.Column>
                            )}
                          </Table.Header>
                          <Table.Body
                            items={list.items}
                            loadingState={list.loadingState}
                          >
                            {(item) => (
                              <Table.Row key={item.name}>
                                {(columnKey) => (
                                  <Table.Cell>{item[columnKey]}</Table.Cell>
                                )}
                              </Table.Row>
                            )}
                          </Table.Body>
                        </Table>
                      </Text>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        auto
                        flat
                        color="error"
                        onClick={closeHandler_Ports}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Card.Body>
              </Card>
            </Col>
          </Row>
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

    // let networkstats = await pool.query(
    //    `select * from "${id}"."networkstats"; `
    // );

    let hardware = await pool.query(`select * from "${id}"."hardware"; `);

    let iface = await client.query(
      `select * from "${id}"."networkinterface"; `
    );

    let os = req.req.session.devices.dev[`${id}`].os;
    req.req.session.devices.dev[`${id}`].hardware = hardware.rows;
    req.req.session.devices.dev[`${id}`].iface = iface.rows;
    req.req.session.devices.dev[`${id}`].events = events.rows;

    return {
      props: {
        os: JSON.stringify(os),
        hardware: JSON.stringify(hardware.rows[0]),
        iface: JSON.stringify(iface.rows[0]),
        events: JSON.stringify(events.rows[0]),
        ports: JSON.stringify(ports.rows),
      },
    };
  },
  ironOptions
);
