import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../session/session_Config";

const { pool, client } = require("../connections/connection");

let dev = [];
export default withIronSessionApiRoute(handler, ironOptions);

async function handler(req, res) {
  let device_Id = req.body.currDev;

  if (
    typeof device_Id === "undefined" ||
    typeof req.session.devices === "undefined"
  ) {
    await res.status(200).json({ ok: false });
  } else {
    const rows = await pool.query(`SELECT * FROM "${device_Id}"."os" ;`);

    res.status(200).json({
      ok: true,
      hw: {
        id: device_Id,
        hostname: rows.rows[0].hostname,
        version: rows.rows[0].version,
        build: rows.rows[0].build,
      },
    });
  }
}
