import Head from 'next/head'
import Navbar from "./templates/navbar/navbar";
import styles from '../styles/Home.module.css'
import { Dropdown,  Text,Col, Row, Grid, Container , Spacer, Card, Button,Modal, useModal, Input } from "@nextui-org/react";

export default function Home({os,hardware, iface, networkstats,ports}) {


console.log(ports)
 

    const { setVisible, bindings } = useModal();

  
  return (


    <div className={styles.container}>
        <Navbar/>
 





<Container gap={0}>






  
<Spacer y={1} />

      <Row gap={1}>
        <Col>
        
        <Button width="30%" auto shadow color="$colors$primary" onClick={() => setVisible(true)}>
        Device ID
      </Button>
      <Modal
        scroll
        width="30%"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Device ID
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-description">
        {hardware.id}      
  
        
      
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
          <Button auto onClick={() => setVisible(false)}>
           OK
          </Button>
        </Modal.Footer>
      </Modal>


        </Col>
        <Col>
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
        </Col>

        <Col>
        <Button width="30%" auto shadow color="$colors$primary" onClick={() => setVisible(true)}>
        Add new device
      </Button>
      <Modal
        scroll
        width="30%"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}s
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add new device
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-description">
       
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Device ID"
          
          />
        
      
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
          <Button auto onClick={() => setVisible(false)}>
           OK
          </Button>
        </Modal.Footer>
      </Modal>

        </Col>



      </Row>


      <Spacer y={1} />

      <Row gap={1}>
 
    
        <Col>
          <Card css={{ $$cardColor: '$colors$primary',  mw: "100%" }}>
          
      <Card.Body>
      <Text>{os.hostname}
      <br></br>
      {os.version} ({os.build})
      <br></br>

      CPU: {hardware.Title}
      <br></br>
  
      RAM: {Math.round(((hardware.TotalMemory/1024)/1024)/1024)}GB 

      </Text>        
      </Card.Body>
    </Card>

        </Col>
      </Row>

      <Spacer y={1} />
      <Row gap={1}>
        <Col>
          <Card css={{ $$cardColor: '$colors$primary' }}>
            <Card.Body>
              <Text h6 size={12} color="white" css={{ m: 0 }}>
                {networkstats.interface} <br></br>
                Local Latency: {networkstats.localLatency}ms <br></br>
                Public Latency:  {networkstats.publicLatency}ms
              </Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card css={{ $$cardColor: '$colors$primary' }}>
            <Card.Body>
              <Text h6 size={12} color="white" css={{ m: 0 }}>
            {iface.iface} ({iface.speed}mb/s)<br></br>
            MAC: {iface.mac}<br></br>
            IPv4: {iface.IPv4}

              </Text>
            </Card.Body>
          </Card>
        </Col>


        
        <Col>
          <Card css={{ $$cardColor: '$colors$primary' }}>
            <Card.Body>
              <Text h6 size={12} color="white" css={{ m: 0 }}>
                Open Ports <br></br>{ports.length}
              </Text>
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
                chart
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