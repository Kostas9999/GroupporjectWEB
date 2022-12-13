import Head from 'next/head'
import React from "react";
import Navbar from "./templates/navbar/navbar";
import styles from '../styles/Home.module.css'
import { Dropdown,  Text,Col, Row, Grid, Container , Spacer, Card, Button,Modal, useModal, Input } from "@nextui-org/react";

export default function Home({os,hardware, iface, networkstats,ports}) {


console.log(ports)
 

const [visible_getDeviceID, setVisible_Login] = React.useState(false);
const handler_getDeviceID = () => setVisible_Login(true);
const closeHandler_getDeviceID = () => { setVisible_Login(false);};

const [visible_Ports, setVisible_Ports] = React.useState(false);
const handler_Ports = () => setVisible_Ports(true);
const closeHandler_Ports = () => { setVisible_Ports(false);};


const [visible_iface, setVisible_iface] = React.useState(false);
const handler_iface = () => setVisible_iface(true);
const closeHandler_iface = () => { setVisible_iface(false);};

const [visible_netStats, setVisible_netStats] = React.useState(false);
const handler_netStats = () => setVisible_netStats(true);
const closeHandler_netStats = () => { setVisible_netStats(false);};


  
  return (


    <div className={styles.container}>
        <Navbar/>
 




       
<Container gap={0}>


  
<Spacer y={1} />

<Row gap={1}>

<Dropdown>
      <Dropdown.Button flat color="$colors$primary" css={{  color:"white", tt: "capitalize" }}>
      Select Device
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Single selection actions"
        color="secondary"
        disallowEmptySelection  
      >
        <Dropdown.Item key="text">TODO</Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>

</Row>
<Spacer y={1} />

      <Row gap={1}>
 
    
        <Col>
          <Card css={{ $$cardColor: '$colors$primary',  mw: "100%" }}>
          
      <Card.Body>
    
      <Button size="xl" id="getDeviceID" auto shadow color="$colors$primary" onPress={handler_getDeviceID}>
      <Text h6 size={14} color="white" css={{ m: 0 }}>{os.hostname}   <> </> 
      
      {os.version} ({os.build})     

      CPU: {hardware.Title}    
  
      RAM: {Math.round(((hardware.TotalMemory/1024)/1024)/1024)}GB 

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
            Device ID
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-description">
      ID: {hardware.id} <br></br>
       Hostname:  {os.hostname}   <br></br>
      OS: {os.version} ({os.build}) <br></br>
      CPU: {hardware.Title}  <br></br>
      RAM: {Math.round(((hardware.TotalMemory/1024)/1024)/1024)}GB <br></br>   

      
        

  
        
      
          </Text>
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



      </Card.Body>
    </Card>

        </Col>
      </Row>

      <Spacer y={1} />
      <Row gap={1}>
        <Col>
        <Card css={{ $$cardColor: '$colors$primary',  mw: "100%" }}>
          
          <Card.Body>
        
          <Button size="xl" id="getDeviceID" auto shadow color="$colors$primary" onPress={handler_netStats}>
          <Text h6 size={14} color="white" css={{ m: 0 }}>
            {networkstats.localLatency} netstats
    
          </Text>     
          </Button>
          <Modal
            scroll
            blur
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
          ID: {hardware.id} <br></br>
           Hostname:  {os.hostname}   <br></br>
          
          
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="error" onPress={closeHandler_netStats}>
                Close
              </Button>
              <Button auto onPress={closeHandler_netStats }>
               OK
              </Button>
            </Modal.Footer>
          </Modal>
    
    
    
          </Card.Body>
        </Card>
        </Col>




        <Col>

   
        <Card css={{ $$cardColor: '$colors$primary',  mw: "100%" }}>
          
          <Card.Body>
        
          <Button size="xl" id="getDeviceID" auto shadow color="$colors$primary" onPress={handler_iface}>
          <Text h6 size={14} color="white" css={{ m: 0 }}>

            {iface.iface}
    
          </Text>     
          </Button>
          <Modal
            scroll
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
              {iface.iface} 
    
          
            
    
      
            
          
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="error" onPress={closeHandler_iface}>
                Close
              </Button>
              <Button auto onPress={closeHandler_iface }>
               OK
              </Button>
            </Modal.Footer>
          </Modal>
    
    
    
          </Card.Body>
        </Card>



        </Col>


        
        <Col>
        <Card css={{ $$cardColor: '$colors$primary',  mw: "100%" }}>
          
          <Card.Body>
        
          <Button size="xl" id="getDeviceID" auto shadow color="$colors$primary" onPress={handler_Ports}>
          <Text h6 size={14} color="white" css={{ m: 0 }}>Open Ports (Listening): {ports.length}    
          </Text>     
          </Button>
          <Modal
            scroll
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
        
           {ports.map((item, index) => (
            <Text id="modal-title" size={18}>
               {item.port}{item.process}{item.pid}{item.path}
              </Text>


           ))}
      
    
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="error" onPress={closeHandler_Ports }>
                Close
              </Button>
              <Button auto onPress={closeHandler_Ports }>
               OK
              </Button>
            </Modal.Footer>
          </Modal>
    
    
    
          </Card.Body>
        </Card>
        </Col>
      </Row>

      <Spacer y={1} />



      <Spacer y={1} />

      <Row gap={1}>
 
    
        <Col>
          <Card css={{ $$cardColor: '$colors$primary',  mw: "100%" }}>
            <Card.Body>
              <Text h6 size={15} color="white" css={{ m: 0 }}>
                chart TODO
              </Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      
    </Container>









    </div>
  )
}
export async function getServerSideProps( context ) {


    
    const id = context.query.devID// Get ID from slug `/book/1`
   

    const data = {device_Id: id}    
    const JSONdata = JSON.stringify(data)     
  
    const endpoint = 'http://localhost:3001/api/getDeviceData'   
  
     const options = {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSONdata,
     }
  
     const response = await fetch(endpoint, options)
     const result = await response.json();
    
     
     return { 
       props: { 
        os : result.os[0],
        hardware : result.hardware[0],
        iface : result.iface[0],
        networkstats : result.networkstats[0],
        ports : result.ports,
            
     } 
       
     }
     
   }