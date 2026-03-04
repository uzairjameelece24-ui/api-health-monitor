const sendAlert = require('./email');
const axios = require('axios');
const Log = require('../models/Log');

const pingApi = async (api) => {
  const startTime = Date.now();
  let success = false;
  let statusCode = null;

  try {
    const https = require("https");

const response = await axios.get(api.url, {
  timeout: 5000,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});
    statusCode = response.status;
    success = statusCode >= 200 && statusCode < 400;
  } catch (error) {
  console.log("FULL ERROR:", error.message);
  console.log("ERROR CODE:", error.code);

  if (error.response) {
    statusCode = error.response.status;
  }
}

  const responseTime = Date.now() - startTime;

  await Log.create({
  apiId: api._id,
  statusCode,
  responseTime,
  success
});

if (!success) {
  await sendAlert(api.name, api.url);
}
};

module.exports = pingApi;