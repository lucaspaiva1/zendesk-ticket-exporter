const state = require("./state.js");

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
let csvWriter;

const createCsv = (index) => {
  return createCsvWriter({
    path: `./tmp/csv/results-${index}.csv`,
    header: [
      { id: "id", title: "ID" },
      { id: "name", title: "Nome" },
      { id: "email", title: "Email" },
      { id: "subject", title: "Titulo" },
      { id: "description", title: "Conteudo" },
      { id: "date", title: "Data" },
    ],
    fieldDelimiter: ";",
  });
};

async function run() {
  const content = state.load();

  if (!content.responses) return null;

  const total = content.responses.length;
  const divisor = total / 8;
  let current = 1;
  let count = 0;

  let csvWriter = createCsv(current);

  for (const responseIndex of content.responses) {
    if (count > divisor) {
      count = 0;
      current++;
      csvWriter = createCsv(current);
    }

    const tickets = state.loadTickets(responseIndex);
    const records = tickets.filter((ticket) => ticket.subject != "SCRUBBED");
    if (records.length) {
      await csvWriter.writeRecords(records);
    }
    count++;
  }
}

module.exports = run;
