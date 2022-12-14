
import { withIronSessionSsr } from "iron-session/next";
import Navbar from '../pages/templates/navbar/navbar';
import styles from '../styles/Home.module.css'

import {  Card,  Button , Text, Loading, Grid, Modal, Input, Spacer} from "@nextui-org/react";
import React from "react";
import { Router } from "next/router";

import {useRouter} from 'next/router'


export default  function Checkout({devices,devicesTitle}) {
 
    const router = useRouter()


    const [visible_getDeviceID, setVisible_Login] = React.useState(false);
const handler_getDeviceID = () => setVisible_Login(true);
const closeHandler_getDeviceID = () => { setVisible_Login(false);};

  return (
    <>
  

<Navbar />

<Spacer y={1} />


<Button size="xl" 
      id="getDeviceID" 
      auto shadow color="$colors$primary" 
      onPress={handler_getDeviceID}
     
      >
      <Text h6 
      size={14}  
      color="white" 
      css={{ m: 0 , "line-height": "1rem"}}      
      >        
Add Device

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
        <Input 
          bordered 
          
          color="primary" />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler_getDeviceID }>
            Close
          </Button>
          <Button auto onPress={closeHandler_getDeviceID }>
           OK
          </Button>
        </Modal.Footer>
      </Modal>



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
        query: { devID: item.OS.id }
             
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
  
    const endpoint = 'http:/185.38.61.93:3000/api/getDeviceTitle'   
  
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