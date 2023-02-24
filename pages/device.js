import Head from "next/head";
import { ironOptions } from "./api/session/session_Config";
import { withIronSessionSsr } from "iron-session/next";


import Navbar from "./templates/navbar/navbar";
import React, { PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

import { useRouter } from "next/router";

import { NextUIProvider } from "@nextui-org/react";
import styles from "../styles/Home.module.css";

import {
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

export default function Home({ all, currDev }) {
  all = JSON.parse(all);

  //console.log(all.devices[`${currDev}`].arp);

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
          onClick={(e) => closeApp(item.pid, e)}
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
  all.devices[`${currDev}`].events.map(
    (item, index) => (keys = Object.keys(item))
  );

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
    router.push({
      pathname: "/device",
      query: { devID: currDev },
    });
  }

  async function test(id) {
    refresh();
    let myIDs = ["charts", "disc", "events", "arp", "ports"];

    myIDs.forEach((e) => {
      if (id == e) {
        document.getElementById(e).style.display = "block";
      } else {
        document.getElementById(e).style.display = "none";
      }
    });
    // document.getElementById("charts").style.display = "none";
    // document.getElementById("disc").style.display = "block";
    //  document.getElementById("events").style.display = "none";
    //  document.getElementById("arp").style.display = "none";
    //   document.getElementById("ports").style.display = "none";
  }

  async function closeApp(pid) {
    
    const JSONdata = JSON.stringify({pid:pid});

    const endpoint = `/api/tcp/send_tls`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    console.log(response)
    const result = await response.json();

    if (result.ok) {console.log("here")}
   
    console.log("close " + pid);
  }

  const latencyData = all.devices[`${currDev}`].networkStats;

  return (
    <>
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

          <Grid xs={12}>
            <Container>
              <Card css={{ $$cardColor: btn_back }} className={styles.thirteen}>
                <Card.Body>
                  <Row justify="center" align="right">
                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                      Last Seen:{" "}
                      {dateTimeFormater(
                        all.devices[`${currDev}`].networkStats[0].created
                      )}
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
                      {all.devices[`${currDev}`].hardware[0].title}
                      <Spacer y={0}></Spacer>
                      RAM:{" "}
                      {formatBytes(
                        Math.ceil(
                          all.devices[`${currDev}`].hardware[0].totalmemory
                        )
                      )}
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
                      rx_total:{" "}
                      {formatBytes(
                        all.devices[`${currDev}`].networkStats[0].rx_total
                      )}
                      <Spacer y={0}></Spacer>
                      rx_error:{" "}
                      {formatBytes(
                        all.devices[`${currDev}`].networkStats[0].rx_error
                      )}
                      <Spacer y={0}></Spacer>
                      rx_dropped:{" "}
                      {formatBytes(
                        all.devices[`${currDev}`].networkStats[0].rx_dropped
                      )}
                      <Spacer y={0}></Spacer>
                      tx_total:{" "}
                      {formatBytes(
                        all.devices[`${currDev}`].networkStats[0].tx_total
                      )}
                      <Spacer y={0}></Spacer>
                      tx_error:{" "}
                      {formatBytes(
                        all.devices[`${currDev}`].networkStats[0].tx_error
                      )}
                      <Spacer y={0}></Spacer>
                      tx_dropped:{" "}
                      {formatBytes(
                        all.devices[`${currDev}`].networkStats[0].tx_dropped
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
          {/* ========================================================= Start second row SIDEBAR
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
                      onClick={refresh}
                      size="md"
                      auto
                      shadow
                      css={{ background: btn_back }}
                      className={styles.thirteen}
                    >
                      Refresh
                    </Button>
                  </Row>
                  <Spacer y={1}></Spacer>
                  <Row justify="center" align="right">
                    <Button
                      onClick={(e) => test("charts")}
                      size="md"
                      auto
                      shadow
                      css={{ background: btn_back }}
                      className={styles.thirteen}
                    >
                      Latency
                    </Button>
                  </Row>
                  <Spacer y={1}></Spacer>
                  <Row justify="center" align="right">
                    <Button
                      onClick={(e) => test("disc")}
                      size="md"
                      auto
                      shadow
                      css={{ background: btn_back }}
                      className={styles.thirteen}
                    >
                      HDD
                    </Button>
                  </Row>
                  <Spacer y={1}></Spacer>
                  <Row justify="center" align="right">
                    <Button
                      onClick={(e) => test("events")}
                      size="md"
                      auto
                      shadow
                      css={{ background: btn_back }}
                      className={styles.thirteen}
                    >
                      Events
                    </Button>
                  </Row>
                  <Spacer y={1}></Spacer>
                  <Row justify="center" align="right">
                    <Button
                      onClick={(e) => test("arp")}
                      size="md"
                      auto
                      shadow
                      css={{ background: btn_back }}
                      className={styles.thirteen}
                    >
                      ARP
                    </Button>
                  </Row>
                  <Spacer y={1}></Spacer>
                  <Row justify="center" align="right">
                    <Button
                      onClick={(e) => test("ports")}
                      size="md"
                      auto
                      shadow
                      css={{ background: btn_back }}
                      className={styles.thirteen}
                    >
                      Ports
                    </Button>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
          </Grid>

          {/* ========================================================= Start chart row
           Start chart row     
               
          */}
          <div id="charts" style={{ width: "80%" }}>
            <Grid xs={12}>
              <Container>
                <Card css={{ $$cardColor: btn_back, h: "75vh" }}>
                  <Card.Body>
                    <Text h6 size={15} color="red" css={{ m: 0 }}>
                      Local Latency
                    </Text>
                    <Spacer y={0}></Spacer>
                    <Text h6 size={15} color="#8884d8" css={{ m: 0 }}>
                      Public Latency
                    </Text>
                    <Row justify="center" align="right">
                      <LineChart
                        syncId="anyId"
                        width={1150}
                        height={200}
                        data={latencyData.reverse()}
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

                        <XAxis dataKey="created" />
                        <YAxis dataKey="publiclatency" domain={[0, 100]} />
                        <Tooltip />
                      </LineChart>
                    </Row>
                    <Text h6 size={15} color="red" css={{ m: 0 }}>
                      CPU
                    </Text>{" "}
                    <Spacer y={0}></Spacer>
                    <Text h6 size={15} color="#8884d8" css={{ m: 0 }}>
                      RAM
                    </Text>
                    <Row justify="center" align="right">
                      <LineChart
                        syncId="anyId"
                        width={1150}
                        height={200}
                        data={latencyData.reverse()}
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

                        <XAxis dataKey="created" />
                        <YAxis dataKey="publiclatency" domain={[0, 100]} />
                        <Tooltip />
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
        </Grid.Container>
      </main>
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(req) {
    const { client, pool } = require("./api/database/connections/connection");

    const id = req.query.devID;

    let ports = await client.query(
      `select * from "${id}"."ports" ORDER BY created DESC; `
    );
    let events = await client.query(
      `select * from "${id}"."events" ORDER BY created DESC LIMIT 100;  `
    );

    let networkstats = await pool.query(
      `select * from "${id}"."networkstats" ORDER BY created DESC LIMIT 1000 ; `
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
