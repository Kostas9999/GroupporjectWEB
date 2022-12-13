import { CubejsApi } from '@cubejs-client/core';


export async function getAquisitionsByYear() {


    

  
    let device_Id = "2f408380_1640_a47e_e594_107b441b91a1"
    const data = {device_Id}    
    const JSONdata = JSON.stringify(data)    
    
    
  
    const endpoint = 'http://localhost:3001/api/getDeviceData'   
  
     const options = {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSONdata,
     }
  
     const response = await fetch(endpoint, options)
     const result = await response.json();
    
     



 
  
  
  
  


  

  return result.networkstats;


}
