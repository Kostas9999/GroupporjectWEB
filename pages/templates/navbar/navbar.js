import React from "react";
import { Mail } from "../../../public/templates/navbar/js/Mail";
import { Password } from "../../../public/templates/navbar/js/Password";
import { useRouter } from "next/router";
import { Avatar, Dropdown } from "@nextui-org/react";
import { Layout } from "../../../public/templates/navbar/Layout.js";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Sphere from "../../../public/3D/componets/AnimatedShape";

import { NextUIProvider } from "@nextui-org/react";
import { SSRProvider } from "react-aria";
import styles from "../../../styles/Home.module.css";

var xss = require("xss");
import { useState, useEffect } from "react";
import {
  Image,
  Navbar,
  Button,
  Text,
  Modal,
  Input,
  Link,
  Switch,
  User,
  Spacer,
} from "@nextui-org/react";
import { Snackbar } from "@mui/material";

export default function App({ user }) {
  let emailpref = "";

  const handleEmailSelect = async (e, pos) => {
    if (pos.checked) {
      setEmailPref(emailPrefer + `, "${e}"`);
    } else {
      setEmailPref(emailPrefer.replace(e, ""));
    }
  };

  const handleSelect = async (e) => {
    if (e == "logout") {
      logout();
    } else if (e == "Notifications") {
      setVisible_Notifications(true);
      getEmailPref();
    } else console.log(e);
  };

  async function getEmailPref() {
    const endpoint = `/api/database/queries/getNotification`;

    let user_id = user.user.user_id;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user_id),
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    emailpref = result.data.emailpref;
    setEmailPref(emailpref);
    return emailpref;
  }

  let notifications = [
    "DSC_FULL",
    "MEM_USE",
    "LAT_LOC",
    "LAT_PUB",
    "GTW_ADR",
    "NGH_NEW",
    "PRT_NEW",
    "RX_DRP",
    "RX_ERR",
    "TX_DRP",
    "TX_ERR",
  ];

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
    const endpoint = `/api/database/queries/user_registration`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (result.ok) {
      router.push("/Dashboard");
    } else {
      const elem = (document.getElementById("message").textContent =
        result.message);
    }
  }

  async function handleSubmit_Notifications() {
    let pref = emailPrefer;
    pref = pref.replaceAll('"", ', "").replaceAll(', ""', "");

    const endpoint = `/api/database/queries/setNotifications`;

    let user_id = user.user.user_id;

    let data = JSON.stringify({ pref: emailPrefer, user_id });

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    setVisible_Notifications(false);
  }
  const [checked, setChecked] = useState(false);

  const switchHandler = (event) => {
    console.log(event);
    setChecked(event.target.checked);
  };

  async function handleSubmit_Login(event) {
    event.preventDefault();

    const name = xss(document.querySelector("#username").value);
    const pass = xss(document.querySelector("#password").value);

    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = `/api/database/queries/user_login`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (result.ok) {
      router.push("/Dashboard");
    } else {
      const elem = (document.getElementById("login_Err_message").textContent =
        result.message);
    }
  }

  async function logout() {
    const response = await fetch("/api/session/session_Logout");
    const result = await response.json();

    if (result.ok) {
      router.push("/");
    }
  }

  const [visible_Login, setVisible_Login] = React.useState(false);
  const handler_Login = () => setVisible_Login(true);
  const closeHandler_Login = () => {
    setVisible_Login(false);
  };

  const [visible_Reg, setVisible_Reg] = React.useState(false);
  const handler_Reg = () => setVisible_Reg(true);
  const closeHandler_Reg = () => {
    setVisible_Reg(false);
  };

  const [visible_Notifications, setVisible_Notifications] =
    React.useState(false);

  const handler_Notifications = () => setVisible_Notifications(true);
  const closeHandler_Notifications = () => {
    setVisible_Notifications(false);
  };

  const [emailPrefer, setEmailPref] = React.useState(emailpref);

  const collapseItems = ["Dashboard"];

  return (
    <SSRProvider>
      <Layout>
        <Navbar
          isCompact
          isBordered
          variant="sticky"
          css={{
            $$navbarBackgroundColor: "transparent",
            $$navbarBlurBackgroundColor: "transparent",
          }}
        >
          <Navbar.Brand
            css={{
              "@xs": {
                w: "12%",
              },
            }}
          >
            <Link href="./">
              <Image
                width={120}
                height={120}
                src="/img/ico.png"
                alt="monTool"
              />
              <Text
                size={30}
                css={{
                  textGradient: "45deg, $black -20%, $blue600 80%",
                }}
              >
                monTool
              </Text>
            </Link>
          </Navbar.Brand>
          <Navbar.Content
            id="navbarLinks"
            css={{
              display: user?.user !== undefined ? "block" : "none",
            }}
            enableCursorHighlight
            activeColor="warning"
            hideIn="xs"
            variant="highlight"
          >
            <Link href="./Dashboard" block color="primary">
              Dashboard
            </Link>
            <Link href="./apiPage" block color="primary">
              API
            </Link>
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
              aria-label="login_btn"
              auto
              shadow
              style={{
                display: user?.user === undefined ? "block" : "none",
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
              <a id="login_Err_message" color="red"></a>
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
                    required
                    minLength={6}
                    maxLength={20}
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
                    required
                    minLength={6}
                    maxLength={20}
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
            <Navbar.Item>
              <Button
                id="Register"
                auto
                shadow
                style={{
                  display: user?.user === undefined ? "block" : "none",
                }}
                onClick={handler_Reg}
              >
                Register
              </Button>
            </Navbar.Item>
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
                  <Text b size={24}></Text>
                </Text>
              </Modal.Header>
              <a id="message"></a>
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
                    required
                    minLength={6}
                    maxLength={20}
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
                    required
                    minLength={6}
                    maxLength={30}
                    type="email"
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
                    required
                    minLength={6}
                    maxLength={20}
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

            <Modal
              closeButton
              blur
              aria-labelledby="modal-title"
              open={visible_Notifications}
              onClose={closeHandler_Notifications}
            >
              <Modal.Header>
                <Text>Notifications</Text>
              </Modal.Header>

              <Modal.Body>
                {notifications.map((e) => (
                  <Text>
                    <Switch
                      shadow
                      color="primary"
                      checked={emailPrefer.includes(e)}
                      onChange={(pos) => {
                        handleEmailSelect(e, pos.target);
                      }}
                    />
                    {e}
                  </Text>
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  auto
                  flat
                  color="error"
                  onClick={closeHandler_Notifications}
                >
                  Cancel
                </Button>

                <Button
                  type="submit_Notifications"
                  auto
                  onClick={handleSubmit_Notifications}
                >
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
            <Navbar.Item
              css={{
                display: user?.user !== undefined ? "block" : "none",
              }}
            >
              <Dropdown placement="bottom-right">
                <Dropdown.Trigger>
                  <Canvas className="canvas">
                    <OrbitControls enableZoom={false} />
                    <directionalLight position={[-2, 5, 2]} intensity={1} />
                    <Suspense fallback={null}>
                      <Sphere />
                    </Suspense>
                  </Canvas>
                </Dropdown.Trigger>

                <Dropdown.Menu
                  disabledKeys={["system", "configurations"]}
                  aria-label="User menu actions"
                  color="warning"
                  onAction={(actionKey) => {
                    handleSelect(actionKey);
                  }}
                >
                  <Dropdown.Item key="profile" css={{ height: "$18" }}>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      {user?.user?.user_name}
                    </Text>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      {user?.user?.user_email}
                    </Text>
                  </Dropdown.Item>

                  <Dropdown.Item key="Notifications" withDivider>
                    Notifications
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
            </Navbar.Item>
          </Navbar.Content>
        </Navbar>
      </Layout>
    </SSRProvider>
  );
}
