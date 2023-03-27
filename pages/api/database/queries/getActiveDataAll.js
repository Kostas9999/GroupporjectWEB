const { pool, client } = require("../connections/connection");
let responses = [];
export default async function handler(req, res) {
  const devices = req.body;


devices.forEach(async (device_Id) => {
    const rows = await pool
      .query(
        `SELECT * FROM "${device_Id}".networkstats ORDER BY created DESC LIMIT 1;`
      ).then(rows => {
        responses.push(rows.rows[0])
      })
      
      
    })
  

    await res.status(200).json(responses)

}
