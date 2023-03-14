const { client } = require("../connections/connection");
export default async function handler(req, res) {
  const device_Id = req.body.currDev;


  const rows = await client.query(
    `SELECT * FROM "${device_Id}".networkstats ORDER BY created DESC  LIMIT 1;`
  );
  await res.status(200).json({
    data: rows.rows,
  });
}
