
import { withIronSessionSsr } from "iron-session/next";
import Navbar from '../pages/templates/navbar/navbar';
import styles from '../styles/Home.module.css'

import {  Card,  NextUIProvider , Text, Loading, Grid} from "@nextui-org/react";
import React from "react";
import { Router } from "next/router";

import {useRouter} from 'next/router'


export default  function Checkout({devices,devicesTitle}) {
    const router = useRouter()

  return (
    <>
  

<Navbar />

    <Grid.Container gap={2} justify="flex-start">
    {devicesTitle.map((item, index) => (
      
      <Grid xs={60} sm={30}>
      <Card
      isPressable
      isHoverable
      variant="bordered"
      css={{ mw: "400px" }}

      onPress={event => {  router.push({
        pathname: '/device',
        query: { devID: item.OS.id },
      })}}
   
    >
          
      <Card.Body>
       {item.OS.hostname} <br></br>
       {item.OS.version}    ({item.OS.build} )<br></br>
      
      </Card.Body>
    </Card>
      </Grid>
    ))}
  </Grid.Container>

   
  </>

       
  )
}





export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {

let devicesTitle =[];
//console.log(req.session)
   
  for  (const item of req.session.devices.devices) {

 

    const data = {device_Id: item.id}    
    const JSONdata = JSON.stringify(data)     
  
    const endpoint = 'http://localhost:3001/api/getDeviceTitle'   
  
     const options = {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSONdata,
     }
  
     const response = await fetch(endpoint, options)
     const result = await response.json();
    
    devicesTitle.push(result);
   
  }

//console.log(devicesTitle)
  

 
    return {      
      props: {
        user: req.session.user,
        devices: req.session.devices,
        devicesTitle: devicesTitle
        
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