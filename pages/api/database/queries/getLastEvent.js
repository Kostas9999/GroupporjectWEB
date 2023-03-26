import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../session/session_Config";

const { client } = require("../connections/connection");

export default withIronSessionApiRoute(handler, ironOptions);

async function handler(req, res) {
  let device_Id = req.body.currDev;

  if (typeof device_Id === "undefined") {
    await res.status(200).json({ ok: false });
  } else {
    try {
      const rows = await client.query(
        `SELECT * FROM "${device_Id}"."events" ORDER BY created DESC  LIMIT 1 ;`
      );

      res.status(200).json({
        ok: true,
        event: rows.rows[0],
      });
    } catch (error) {
      res.status(200).json({
        ok: false,
      });
    }
  }
}
