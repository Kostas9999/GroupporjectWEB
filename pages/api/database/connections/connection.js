const fs = require("fs");
const { Client, Pool } = require("pg");
//import { Client, Pool } from "pg";

const config = {
  connectionString:
    "postgresql://MGproject:YP4rEujgDgdEcuUUE2e6xA@cluster-4036.6zw.cockroachlabs.cloud:26257/groupproject?sslmode=verify-full",
  ssl: {
    rejectUnauthorized: true,
    ca: fs
      .readFileSync("./pages/api/database/cert/cockroach_db_root.crt")
      .toString(),
  },
};

const client = new Client(config);
client.connect((err) => {
  if (err) {
    console.error("error connecting to database (cockroach_db)", err.stack);
  } else {
  }
});

async function test() {
  let rows = await client.query(`SELECT * FROM "groupproject"."user";`);
  console.log(rows);
}

module.exports = { client };