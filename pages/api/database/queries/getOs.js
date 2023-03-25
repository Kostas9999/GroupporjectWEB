import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../session/session_Config";

const { client } = require("../connections/connection");

let dev = [];
export default withIronSessionApiRoute(handler, ironOptions);

async function handler(req, res) {
  let device_Id = req.body.currDev;

  if (typeof device_Id === "undefined") {
    console.log(req.session.devices[device_Id]);
    await res.status(200).json({ ok: false });
  } else {
    const rows = await client.query(`SELECT * FROM "${device_Id}"."os" ;`);
    req.session.devices = { device_Id: { os: rows.rows[0] } };

    await req.session.save();

    await res.status(200).json({
      ok: true,
      os: {
        id: device_Id,
        hostname: rows.rows[0].hostname,
        version: rows.rows[0].version,
        build: rows.rows[0].build,
      },
    });
  }
  /*
  const row = await client
    .query(`SELECT * FROM "${device_Id}".os ;`)
    .then(async (row) => {
      let os = {
        id: device_Id,
        hostname: row.rows[0].hostname,
        version: row.rows[0].version,
        build: row.rows[0].build,
      };

      req.session.devices[device_Id] = os;
      await req.session.save();
      console.log(req.session.devices);
      await res.status(200).json({
        os: {
          id: device_Id,
          hostname: row.rows[0].hostname,
          version: row.rows[0].version,
          build: row.rows[0].build,
        },
      });
    });

    */
}
