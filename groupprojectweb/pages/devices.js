
import { withIronSessionSsr } from "iron-session/next";
import Navbar from '../pages/templates/navbar/navbar';
import { Button, NextUIProvider } from "@nextui-org/react"

import {  Card, Row, Text, Loading, Grid} from "@nextui-org/react";
import React from "react";
import { Input } from "@nextui-org/react";


export default  function Checkout(props) {


  return (
   
<NextUIProvider>
<Navbar />
    <Grid.Container gap={2} justify="flex-start">
    {props.devices.devices.map((item, index) => (
      <Grid xs={60} sm={30} key={index}>
      <Card
      isPressable
      isHoverable
      variant="bordered"
      css={{ mw: "400px" }}
    >
      <Card.Body>
        
      <Loading type="points" />
      </Card.Body>
    </Card>
      </Grid>
    ))}
  </Grid.Container>

      
      
  </NextUIProvider>
       
  )
}





export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    
   

    return {

      
      props: {
        user: req.session.user,
        devices: req.session.devices
        
      },

      
   
    };
  },
  {
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: false //process.env.NODE_ENV === "production",
    },
  },
);