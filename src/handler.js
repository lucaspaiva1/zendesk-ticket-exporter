const state = require("./state.js");

function run() {
  const content = state.load();

  if (!content.responses) return null;

  for (const responseIndex of content.responses) {
    const responseContent = state.loadIndividual(responseIndex);

    const responseTickets = responseContent.tickets.map(
      ({ id, subject, description, requester_id, generated_timestamp }) => {
        const tickerUser = responseContent.users.find(
          (user) => user.id === requester_id
        );

        const date = new Date(generated_timestamp * 1000).toLocaleDateString(
          "pt-br"
        );

        return {
          id,
          subject,
          description,
          name: tickerUser?.name,
          email: tickerUser?.email,
          date,
        };
      }
    );
    state.saveTickets(responseTickets, responseIndex);
  }
}

module.exports = run;
