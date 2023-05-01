const { pool, client } = require("../connections/connection");

export default async function updateNotifications(req, res) {
  try {
    let rows = await pool.query(
      `UPDATE "groupproject"."user" SET emailpref = '${req.body.pref}' WHERE user_id = ${req?.body?.user_id};`
    );

    await res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    await res.status(200).json({
      ok: false,
      message: "Error while updating notifications prferences",
    });
  }
}
