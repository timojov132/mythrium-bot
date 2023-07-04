const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pay')
		.setDescription('/pay @user for goods/services')
		.addUserOption(option =>
			option.setName('payee')
				.setDescription('The @user who you are paying')
				.setRequired(true)),
	async execute(interaction){
		const payee = interaction.options.getUser('payee')
		const modal = new ModalBuilder()
			.setCustomId('transaction')
			.setTitle('Transaction');
		const paymentInput = new TextInputBuilder()
			.setCustomId('paymentInput')
			.setLabel("How much are you paying?")
			.setStyle(TextInputStyle.Short);
		const reasonInput = new TextInputBuilder()
			.setCustomId('reasonInput')
			.setLabel("Why are you paying them?")
			.setStyle(TextInputStyle.Short);
		const paymentActionRow = new ActionRowBuilder().addComponents(paymentInput);
		const reasonActionRow = new ActionRowBuilder().addComponents(reasonInput);
		modal.addComponents(paymentActionRow, reasonActionRow);
		await interaction.showModal(modal);
		return [interaction.user, payee];
	}
}