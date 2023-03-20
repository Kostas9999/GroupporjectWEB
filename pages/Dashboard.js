import { withIronSessionSsr } from "iron-session/next";
import Navbar from "./templates/navbar/navbar";
import Header from "./templates/header";
import { ironOptions } from "./api/session/session_Config";
import { Container, NextUIProvider, Row } from "@nextui-org/react";
import styles from "../styles/Home.module.css";

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

export default function Dashboard({ session, devicesTitle }) {
  devicesTitle = JSON.parse(devicesTitle);
  session = JSON.parse(session);
  let activeData;
  let user = session.user;
  //console.log(session.user.user_id);

  //

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

  async function handleSubmit_Add_Device(event) {
    event.preventDefault();

    //const name = xss(document.querySelector("#dev_ID").value);

    const data = {
      user_id: session.user.user_id,
      dev_id: event.target.dev_ID.value,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = `https://montool.vercel.app/api/database/queries/device_add`;

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

  getActiveData();
  async function getActiveData() {
    Object.keys(session.devices).map(async (dev) => {
      // const data = {
      //    currDev: dev,
      //  };

      // const JSONdata = JSON.stringify(data);

      const endpoint =
        "http://127.0.0.1:3000/api/database/queries/getActiveData";

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currDev: dev }),
      };

      const response = await fetch(endpoint, options);
      const result = await response.json();

      devicesTitle.data = result.data;

      activeData = result.data[0];

      let getDiv = document.getElementById(dev);

      let spinner = getDiv?.querySelector('[aria-label="spinner"]');
      let dataDiv = getDiv?.querySelector('[aria-label="data"]');

      spinner.style.display = "none";
      dataDiv.style.display = "block";

      dataDiv.textContent = `Public Ip: ${activeData.publicip} CPU: ${activeData.cpu} RAM: ${activeData.memory} Last Seen: ${activeData.created}`;
    });
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
          {devicesTitle.map((item, index) => (
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
                    query: { devID: item.id },
                  });
                }}
              >
                <Card.Body css={{ color: text_Color }}>
                  <Row justify="center" align="center">
                    {item.hostname} <br></br>
                    {item.version} ({item.build} )
                    <div id={item.id}>
                      <Loading aria-label="spinner" type="points-opacity" />
                      <Container aria-label="data" style={{ display: "none" }}>
                        {" "}
                      </Container>
                    </div>
                    <Dropdown>
                      <Dropdown.Button
                        flat
                        size={"sm"}
                        css={{ marginLeft: "auto" }}
                      >
                        Remove*
                      </Dropdown.Button>
                      <Dropdown.Menu aria-label="Static Actions">
                        <Dropdown.Item key="delete" color="error">
                          Press to remove device*
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Row>
                </Card.Body>
              </Card>
            </Grid>
          ))}
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

    await req.session.save();

    return {
      props: {
        session: JSON.stringify(req.session),
        devicesTitle: JSON.stringify(devicesTitle),
      },
    };
  },
  ironOptions
);
