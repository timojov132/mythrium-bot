const { Leaderboard } = require('../functions/bankTransactions.js')

module.exports = {
	data: {"menu" : [{"name":"leaderboard", "description":"Select Menu for getting a sorted leaderboard"}]},
    async execute(interaction) {
        const bankSort = Leaderboard(interaction.values[0]);
		await interaction.update({ content: bankSort, components: [] });
    }
}