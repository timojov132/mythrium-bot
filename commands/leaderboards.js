const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const bank = require('../bank.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboards')
		.setDescription('Show leaderboards for any tracked category'),
		async execute(interaction) {
			const row = new ActionRowBuilder()
				.addComponents(
					new SelectMenuBuilder()
						.setCustomId('leaderboard')
						.setPlaceholder('Select a Category')
                        .addOptions([{
							label: "Mythrium",
							description: "Total Mythrium everyone currently has",
							value: "0"},
                            {
                            label: "Transactions",
                            description: "Total number of trades everyone has completed",
                            value: "1"},
                            {
                            label: "Transaction Amount",
                            description: "Total Mythrium everyone has traded so far",
                            value: "2"},
                            {
                            label: "Bounties",
                            description: "Total bounties everyone has completed",
                            value: "3"},
                            {
                            label: "Bounty Rewards",
                            description: "Total Mythrium everyone has earned through bounties",
                            value: "4"}
                            ])
                )
			await interaction.reply({ content: 'Select which category you want to see', ephemeral: true, components: [row] });
		}
};