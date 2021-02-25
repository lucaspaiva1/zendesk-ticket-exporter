const fs = require("fs");
const contentFilePath = "./tmp/state.json";

function save(content) {
  const contentString = JSON.stringify(content);
  return fs.writeFileSync(contentFilePath, contentString);
}

function load() {
  const fileBuffer = fs.readFileSync(contentFilePath, "utf-8");
  const contentJson = JSON.parse(fileBuffer);
  return contentJson;
}

function saveIndividual(content, fileName) {
  const contentString = JSON.stringify(content);
  return fs.writeFileSync(`./tmp/responses/${fileName}.json`, contentString);
}

function loadIndividual(fileName) {
  const fileBuffer = fs.readFileSync(
    `./tmp/responses/${fileName}.json`,
    "utf-8"
  );
  const contentJson = JSON.parse(fileBuffer);
  return contentJson;
}

function saveTickets(content, fileName) {
  const contentString = JSON.stringify(content);
  fs.writeFileSync(`./tmp/tickets/${fileName}.json`, contentString);
  return fileName;
}

module.exports = {
  save,
  load,
  saveIndividual,
  loadIndividual,
  saveTickets,
};
