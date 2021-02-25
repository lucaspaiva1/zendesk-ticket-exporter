const fs = require("fs");
const contentFilePath = "./tmp/state.json";

function save(content) {
  const contentString = JSON.stringify(content);
  return fs.writeFileSync(contentFilePath, contentString);
}

function saveIndividual(content, fileName) {
  const contentString = JSON.stringify(content);
  return fs.writeFileSync(`./tmp/responses/${fileName}.json`, contentString);
}

function load() {
  const fileBuffer = fs.readFileSync(contentFilePath, "utf-8");
  const contentJson = JSON.parse(fileBuffer);
  return contentJson;
}

module.exports = {
  save,
  saveIndividual,
  load,
};
