import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../session/session_Config";

const { client } = require("../connections/connection");

export default withIronSessionApiRoute(handler, ironOptions);

async function handler(req, res) {
  let device_Id = req.body.currDev;

  try {
    const row = await client
      .query(`SELECT * FROM "${device_Id}".os ;`)
      .then(async (row) => {
        let os = {
          id: device_Id,
          hostname: row.rows[0].hostname,
          version: row.rows[0].version,
          build: row.rows[0].build,
        };

        addSession(req.session, os);

        await res.status(200).json({
          os: {
            id: device_Id,
            hostname: row.rows[0].hostname,
            version: row.rows[0].version,
            build: row.rows[0].build,
          },
        });
      });
  } catch (error) {
    console.log(error);
    await res.status(200).json({});
  }
}

function addSession(session, os) {
  session.devices[os.id].os = { os };
  console.log(session);
  session.save();
}
