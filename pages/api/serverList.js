const { client } = require("../api/database/connections/connection");

export default async function loginRoute(req, res) {
  if (req.query.passkey === "groupproject") {
    try {
      let svrList = await client.query(
        `SELECT * FROM "groupproject"."server" ;`
      );

      let serverList = svrList.rows;

      await res.status(200).json({ serverList });
    } catch (error) {
      console.log(error);
      await res.status(200).json({ ok: false });
    }
  } else {
    res.status(404);
  }
}
