import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../session/session_Config";

const { client } = require("../connections/connection");

export default withIronSessionApiRoute(handler, ironOptions);

async function handler(req, res) {
  let device_Id = req.body.currDev;

  try {
    const row = await client.query(`SELECT * FROM "${device_Id}".os ;`);

    req.session.devices[device_Id] = {
      id: device_Id,
      hostname: row.rows[0].hostname,
      version: row.rows[0].version,
      build: row.rows[0].build,
    };

    await req.session.save();

    await res.status(200).json({
      os: {
        id: device_Id,
        hostname: row.rows[0].hostname,
        version: row.rows[0].version,
        build: row.rows[0].build,
      },
    });
  } catch (error) {}
}
