require("dotenv").config();

const modules = {
  fetcher: require("./src/fetcher.js"),
  handler: require("./src/handler.js"),
  exporter: require("./src/exporter.js"),
};

async function run() {
  await modules.fetcher();
  await modules.handler();
  await modules.exporter();
}

run();
