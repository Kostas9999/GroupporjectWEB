import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../session/session_Config";

const { client } = require("../connections/connection");

export default withIronSessionApiRoute(handler, ironOptions);

async function handler(req, res) {
  let device_Id = req.body.currDev;

  try {
    const row = await client.query(
      `SELECT * FROM "${device_Id}"."os" LIMIT 1;`
    );

    let os = {
      id: device_Id,
      hostname: row.rows[0].hostname,
      version: row.rows[0].version,
      build: row.rows[0].build,
    };

    req.session.devices[device_Id].data.os = {
      id: device_Id,
      hostname: row.rows[0].hostname,
      version: row.rows[0].version,
      build: row.rows[0].build,
    };

    await req.session.save();
    console.log(req.session.devices);
    await res.status(200).json({
      os,
    });
  } catch (error) {
    console.log("error in getOs api", error);
  }
}
