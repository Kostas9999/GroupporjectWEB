import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../session/session_Config";
const generator = require("generate-password");
const { client } = require("../database/connections/connection");

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {
  var password = generator.generate({
    length: 64,
    uppercase: true,
    numbers: true,
    strict: true,
  });

  try {
    let key = await client.query(
      `UPDATE "groupproject"."user" SET (api_key) = ('${password}') WHERE user_id = ${req.session.user.user_id} RETURNING api_key;`
    );

    if (key.rows[0].api_key == password) {
      req.session.user.user_api_key = key.rows[0].api_key;
      await req.session.save();

      await res.status(200).json({ ok: true });
    } else {
      await res.status(200).json({ ok: false });
    }
  } catch (error) {
    console.log(error);
    await res.status(200).json({ ok: false });
  }
}
