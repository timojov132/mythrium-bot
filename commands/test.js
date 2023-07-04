const { SlashCommandBuilder, Message } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Simply a test module, do not use')
		.addUserOption(option =>
			option.setName('input')
				.setDescription('The person you want to insult')
				.setRequired(true)),
		async execute(interaction) {
			const payee = interaction.options.getUser('input')
			console.log(payee);
			console.log(`${interaction.user.tag} tried to  heckle ${payee.tag}`);
			await interaction.reply(`You stink ${interaction.user}`)
			await interaction.channel.send(`You smell very nice ${payee}`);

	}};