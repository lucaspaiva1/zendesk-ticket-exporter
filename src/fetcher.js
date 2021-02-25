const { default: axios } = require("axios");
const state = require("./state.js");

const subdomain = process.env.ZENDESK_SUBDOMAIN;

const url = `https://${subdomain}.zendesk.com/api/v2/incremental/tickets/cursor.json`;

const auth = {
  username: process.env.ZENDESK_EMAIL,
  password: process.env.ZENDESK_PASSWORD,
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  const start_time = 0;
  let request_count = 0;
  let end_of_stream = false;
  let cursor = null;

  const state = {
    responses: [],
    cursor: null,
    request_count: null,
  };

  async function makeRequest() {
    const params = cursor ? { cursor } : { start_time };

    params.include = "users";

    const response = await axios.get(url, { params, auth });

    return response.data;
  }

  while (true) {
    await delay(10000); // necessary to comply with the usage limits (10/min)

    const data = await makeRequest();

    request_count++;

    end_of_stream = data.end_of_stream;
    cursor = data.after_cursor;

    state.cursor = data.after_cursor;
    state.responses.push(request_count);
    state.request_count = request_count;

    state.save(state);
    state.saveIndividual(data, request_count);

    console.info("current page", request_count);

    if (end_of_stream) break;
  }
  console.info("done");
}

module.exports = run;
