const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
var retrieveUser;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Get how much mythrium you or someone else has')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('someone else you want to get')
				.setRequired(false)),
		async execute(interaction) {
			if (interaction.options.getUser('user') !== null) {
				retrieveUser = interaction.options.getUser('user')
			} else { retrieveUser = interaction.user }
			const bank = JSON.parse(fs.readFileSync('./bank.json', 'utf8'));
			for (var i = 0; i < bank.length; i++){
				if (bank[i].name === retrieveUser.tag) {
					await interaction.reply({ content: `${retrieveUser} has ${bank[i].mythrium} ╔╦╗`, ephemeral: true})
					break;
				}
			}
		}
};