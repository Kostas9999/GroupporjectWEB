const { pool, client } = require("../connections/connection");
let activeData = {};

export default async function handler(req, res) {
  const devices = req.body.devices;

  let devKeys = Object.keys(devices);
  try {
    for (let i = 0; i < devKeys.length; i++) {
      const rows = await client.query(
        `SELECT * FROM "${devKeys[i]}".networkstats ORDER BY created DESC LIMIT 1;`
      );

      activeData[devKeys[i]] = rows.rows[0];
    }
    await res.status(200).json({ ok: true, activeData });
  } catch (error) {}
}
