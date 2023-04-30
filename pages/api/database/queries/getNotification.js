const { pool, client } = require("../connections/connection");
export default async function handler(req, res) {
  const user_id = req.body;

  try {
    const rows = await client
      .query(
        `SELECT emailpref FROM "groupproject".user WHERE "user_id" = ${user_id} LIMIT 1;`
      )
      .then(async (rows) => {
        await res.status(200).json({
          data: rows.rows[0],
        });
      });
  } catch (error) {
    await res.status(200).json({});
  }
}
