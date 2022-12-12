import Head from 'next/head'
import Navbar from "./templates/navbar/navbar";
import styles from '../styles/Home.module.css'
import { Button,  Text,Modal, Input, Grid, styled , Spacer, Card } from "@nextui-org/react";

export default function Home({os,hardware, iface, networkstats,ports}) {



    console.log(ports)


    const MockItem = ({ text }) => {
        return (
          <Card css={{ h: "$20", $$cardColor: '$colors$primary' }}>
            <Card.Body>
              <Text h6 size={15} color="white" css={{ m: 0 }}>
                {text}
              </Text>
            </Card.Body>
          </Card>
        );
      };

  
  return (




    <div className={styles.container}>
        <Navbar/>
 

    <Grid.Container gap={2} justify="center">
      <Grid xs={6}>
      <Card css={{ mw: "10wh" }}>
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
      </Grid>


      <Grid xs={6}>
      <Card css={{ mw: "10wh" }}>
      <Card.Body>
      <Text>{iface.iface} ({iface.speed}mb)
      <br></br>
      MAC: {iface.mac} 
      <br></br> <br></br>
      IPv4: {iface.IPv4} <br></br> IPv4:{iface.IPv4Sub} 
      <br></br><br></br>
      IPv6: {iface.IPv6}<br></br>  IPv6:{iface.IPv6Sub} 
      </Text>        
      </Card.Body>
    </Card>
        
      </Grid>



      <Grid xs={10}>
      <Card css={{ mw: "800px" }}>
      <Card.Body>
      <Text>
  
      
      </Text>        
      </Card.Body>
    </Card>
      </Grid>


      
     
      <Grid xs={3}>
        <MockItem text="3 of 3" />
      </Grid>
      <Grid xs={3}>
        <MockItem text="1 of 4" />
      </Grid>
      <Grid xs={3}>
        <MockItem text="2 of 4" />
      </Grid>
      <Grid xs={3}>
        <MockItem text="3 of 4" />
      </Grid>
      <Grid xs={3}>
        <MockItem text="4 of 4" />
      </Grid>
      <Grid xs={3}>
        <MockItem text="1 of 3" />
      </Grid>
      <Grid xs={6}>
        <MockItem text="2 of 3" />
      </Grid>
      <Grid xs={3}>
        <MockItem text="3 of 3" />
      </Grid>
    </Grid.Container>


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
        networkstats : result.networkstats,
        ports : result.ports,
            
     } 
       
     }
     
   }