export async function getAquisitionsByYear() {
  let device_Id = "e368b009_dc92_11e5_9c43_bc00000c0000";
  const data = { device_Id };
  const JSONdata = JSON.stringify(data);

  const endpoint = "api/getDeviceData";

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSONdata,
  };

  const response = await fetch(endpoint, options);
  const result = await response.json();

  return result.networkstats;
}
