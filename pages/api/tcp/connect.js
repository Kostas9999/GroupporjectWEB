const tls = require("tls");
var validator = require("validator");
const checksum = require("checksum");
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../session/session_Config";
export default withIronSessionApiRoute(handler, ironOptions);

async function handler(req, res) {
  const cmd = validator.escape(req.body.cmd);
  const param = validator.escape(req.body.param);
  const device = validator.escape(req.body.currDev);
  const user = validator.escape(req.session.user.user_id);
  const server = req.session.devices[device].server[0];

  let data = {
    cmd,
    param,
    device,
    user,
  };

  const options = {
    host: validator.isIP(server.ip) ? server.ip : "127.0.0.1",
    port: validator.isPort(server.port) ? server.port : "443",
    key: key_e,
    cert: cert_e,
    passphrase: "MGproject",
    rejectUnauthorized: false,
  };

  let data_str = JSON.stringify(data);

  const tls_client = await tls.connect(options, async () => {
    let data_chsum = checksum(data_str);

    tls_client.write(
      JSON.stringify({
        type: "EXEC",
        data,
        trailer: { CHECKSUM: data_chsum },
      })
    );
    await res.send({ ok: true });
  });

  tls_client.on("error", async (e) => {
    await res.send({ ok: false });
  });
  //await tls_client.write(JSON.stringify({ type: "MSG", data:pid })).then(()=>{
  //  tls_client.destroy()
  // });

  // tls_client.destroy()
}
//tls_client.close()

let cert_e = `-----BEGIN CERTIFICATE-----
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
B01613Y+ph39vyl5AxdGHiFn03xcZ1pp+A==
-----END CERTIFICATE-----
`;

let key_e = `
-----BEGIN ENCRYPTED PRIVATE KEY-----
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
-----END ENCRYPTED PRIVATE KEY-----
`;
