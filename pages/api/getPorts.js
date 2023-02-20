const mysql = require("mysql2/promise");

export default async function handler(req, res) {
  const device_Id = req.body.device_Id;

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  });

  const [rows] = await connection.execute(`SELECT * FROM ${device_Id}.ports;`, [
    device_Id,
  ]);

  res.send({
    ports: rows,
  });
}
