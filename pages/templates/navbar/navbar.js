import React from "react";
import { Mail } from "../../../public/templates/navbar/js/Mail";
import { Password } from "../../../public/templates/navbar/js/Password";
import { useRouter } from "next/router";
import { Link, Avatar, Dropdown } from "@nextui-org/react";
import { Layout } from "../../../public/templates/navbar/Layout.js";
import Cookies from "js-cookie";
import { NextUIProvider } from "@nextui-org/react";
import styles from "../../../styles/Home.module.css";

var xss = require("xss");

import {
  Navbar,
  Button,
  Text,
  Modal,
  Input,
  Grid,
  Spacer,
} from "@nextui-org/react";

export default function App(data) {
  const handleSelect = (e) => {
    if (e == "logout") {
      logout();
    }
  };

  const router = useRouter();

  async function handleSubmit_Reg(event) {
    event.preventDefault();

    const name_Reg = xss(document.querySelector("#username_Reg").value);
    const mail_Reg = xss(document.querySelector("#email_Reg").value);
    const pass_Reg = xss(document.querySelector("#password_Reg").value);

    const data_Reg = {
      username_Reg: event.target.username_Reg.value,
      email_Reg: event.target.email_Reg.value,
      password_Reg: event.target.password_Reg.value,
    };

    const JSONdata = JSON.stringify(data_Reg);
    const endpoint = "https://montool.vercel.app/api/db_Register";

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
  }

  async function handleSubmit_Login(event) {
    event.preventDefault();

    const name = xss(document.querySelector("#username").value);
    const pass = xss(document.querySelector("#password").value);

    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = "/api/login";

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (result.ok) {
      Cookies.set("username", result.user.user_name);
      Cookies.set("email", result.user.user_email);
      router.push("/Dashboard");
    }
  }

  async function logout() {
    Cookies.remove("username");
    Cookies.remove("email");
    Cookies.remove("devices");
    const response = await fetch("/api/session/session_Logout");
    const result = await response.json();

    if (result.ok) {
      router.push("/");
    }
  }

  const [variant, setVariant] = React.useState("sticky");

  const variants = ["static", "floating", "sticky"];

  const [visible_Login, setVisible_Login] = React.useState(false);
  const [visible_Reg, setVisible_Reg] = React.useState(false);

  const handler_Login = () => setVisible_Login(true);
  const handler_Reg = () => setVisible_Reg(true);

  const closeHandler_Login = () => {
    setVisible_Login(false);
  };
  const closeHandler_Reg = () => {
    setVisible_Reg(false);
  };

  const collapseItems = ["Dashboard"];

  return (
    <NextUIProvider>
      <Layout>
        <Navbar
          css={{ Bottom: "5vh", "line-height": "1rem" }}
          isBordered
          variant="sticky"
          className={styles.navbar}
          // css={{ background: "rgba(0, 0, 0, 0.7)" }}
        >
          <Navbar.Toggle showIn="xs" />
          <Navbar.Brand
            css={{
              "@xs": {
                w: "12%",
              },
            }}
          >
            <Navbar.Content hideIn="xs">
              <Navbar.Link isActive href="./">
                <Text
                  size={40}
                  css={{
                    textGradient: "45deg, $black -20%, $blue600 80%",
                  }}
                >
                  Logo
                </Text>
              </Navbar.Link>
              <Grid.Container>
                <Spacer y={0.5} />
                <Grid.Container gap={1}></Grid.Container>
              </Grid.Container>
            </Navbar.Content>
          </Navbar.Brand>
          <Navbar.Content
            id="navbarLinks"
            css={{ display: "none" }}
            enableCursorHighlight
            activeColor="warning"
            hideIn="xs"
            variant="highlight"
          >
            <Navbar.Link href="./Dashboard">Dashboard</Navbar.Link>
            {/*}
          <Navbar.Link isActive href="#">
            Customers
          </Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link>
            {*/}
          </Navbar.Content>
          <Navbar.Content
            css={{
              "@xs": {
                w: "12%",
                jc: "flex-end",
              },
            }}
          >
            <Button
              id="login"
              auto
              shadow
              style={{
                display: Cookies.get("username") == null ? "block" : "none",
              }}
              onClick={handler_Login}
            >
              Login
            </Button>

            <Modal
              closeButton
              blur
              aria-labelledby="modal-title"
              open={visible_Login}
              onClose={closeHandler_Login}
            >
              <Modal.Header>
                <Text
                  id="modal-title"
                  size={18}
                  css={{
                    textGradient: "45deg, $black -20%, $blue600 80%",
                  }}
                >
                  Login <br></br>
                  <Text b size={24}>
                    Monitoring Tool
                  </Text>
                </Text>
              </Modal.Header>

              <form onSubmit={handleSubmit_Login}>
                <Modal.Body>
                  <Input
                    aria-label="Username"
                    id="username"
                    name="username"
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="sm"
                    placeholder="Username"
                    contentLeft={<Mail fill="currentColor" />}
                  />

                  <Input
                    aria-label="password"
                    id="password"
                    name="password"
                    type="password"
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="sm"
                    placeholder="Password"
                    contentLeft={<Password fill="currentColor" />}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button auto flat color="error" onClick={closeHandler_Login}>
                    Close
                  </Button>

                  <Button type="submit_Login" auto>
                    Sign in
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>

            <Button
              id="Register"
              auto
              shadow
              style={{
                display: Cookies.get("username") == null ? "block" : "none",
              }}
              onClick={handler_Reg}
            >
              Register
            </Button>
            <Modal
              closeButton
              blur
              aria-labelledby="modal-title_Reg"
              open={visible_Reg}
              onClose={closeHandler_Reg}
            >
              <Modal.Header>
                <Text
                  id="modal-title"
                  size={18}
                  css={{
                    textGradient: "45deg, $black -20%, $blue600 80%",
                  }}
                >
                  Register <br></br>
                  <Text b size={24}>
                    Monitoring Tool
                  </Text>
                </Text>
              </Modal.Header>

              <form onSubmit={handleSubmit_Reg}>
                <Modal.Body>
                  <Input
                    aria-label="username_Reg"
                    id="username_Reg"
                    name="username_Reg"
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="sm"
                    placeholder="Username"
                    contentLeft={<Mail fill="currentColor" />}
                  />

                  <Input
                    aria-label="email_Reg"
                    id="email_Reg"
                    name="email_Reg"
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="sm"
                    placeholder="Email"
                    contentLeft={<Mail fill="currentColor" />}
                  />

                  <Input
                    aria-label="password_Reg"
                    id="password_Reg"
                    name="password_Reg"
                    type="password"
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="sm"
                    placeholder="Password"
                    contentLeft={<Password fill="currentColor" />}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button auto flat color="error" onClick={closeHandler_Reg}>
                    Close
                  </Button>

                  <Button type="submit_Reg" auto>
                    Register
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>

            <div css={{ display: "none" }}>
              <Dropdown css={{ display: "none" }} placement="bottom-right">
                <Navbar.Item>
                  <Dropdown.Trigger>
                    <Avatar color="primary" textColor="white" />
                  </Dropdown.Trigger>
                </Navbar.Item>
                <Dropdown.Menu
                  disabledKeys={["settings", "system", "configurations"]}
                  aria-label="User menu actions"
                  color="warning"
                  onAction={(actionKey) => {
                    handleSelect(actionKey);
                  }}
                >
                  <Dropdown.Item key="profile" css={{ height: "$18" }}>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      {Cookies.get("username")}
                    </Text>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      {Cookies.get("email")}
                    </Text>
                  </Dropdown.Item>
                  <Dropdown.Item key="settings" withDivider>
                    My Settings
                  </Dropdown.Item>

                  <Dropdown.Item key="system">System</Dropdown.Item>
                  <Dropdown.Item key="configurations">
                    Configurations
                  </Dropdown.Item>

                  <Dropdown.Item key="logout" withDivider color="error">
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar.Content>
          <Navbar.Collapse>
            {collapseItems.map((item, index) => (
              <Navbar.CollapseItem key={item}>
                <Link
                  color="inherit"
                  css={{
                    minWidth: "100%",
                  }}
                  href={item}
                >
                  {item}
                </Link>
              </Navbar.CollapseItem>
            ))}
          </Navbar.Collapse>
        </Navbar>
      </Layout>
    </NextUIProvider>
  );
}
