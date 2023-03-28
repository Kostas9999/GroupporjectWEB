const { pool, client } = require("../connections/connection");



export default async function handler(req, res) {
  const devices = req.body.devices;

  let devKeys = Object.keys( devices);



  let responses = [];

  for (let i = 0; i < devKeys.length; i++) {

    const rows =  await client
      .query(
        `SELECT * FROM "${devKeys[i]}".networkstats ORDER BY created DESC LIMIT 1;`
      )   

      responses[devKeys[i]]= (rows.rows[0])

     
    } 
 
    console.log(responses);
  
return responses;



 

}


async function getData(device)
{


}