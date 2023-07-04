const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addbounty')
		.setDescription('Only For L3roy to add new bounties'),
		async execute(interaction) {
			const modal = new ModalBuilder()
				.setCustomId('addBounty')
				.setTitle('New Bounty');
			const bountyName = new TextInputBuilder()
				.setCustomId('bountyName')
				.setLabel("Bounty Name")
				.setStyle(TextInputStyle.Short);
			const bountyDescription = new TextInputBuilder()
				.setCustomId('bountyDescription')
				.setLabel("Bounty Description")
				.setStyle(TextInputStyle.Paragraph);
			const bountyValue = new TextInputBuilder()
				.setCustomId('bountyValue')
				.setLabel("How much is this bounty")
				.setStyle(TextInputStyle.Short);
			const repeatBounty = new TextInputBuilder()
				.setCustomId('repeatBounty')
				.setLabel('How many times to repeat this bounty')
				.setStyle(TextInputStyle.Short);
			const bountyTier = new TextInputBuilder()
				.setCustomId('bountyTier')
				.setLabel('What tier is this bounty')
				.setStyle(TextInputStyle.Short);

			const tierActionRow = new ActionRowBuilder().addComponents(bountyTier);
			const nameActionRow = new ActionRowBuilder().addComponents(bountyName);
			const descriptionActionRow = new ActionRowBuilder().addComponents(bountyDescription);
			const valueActionRow = new ActionRowBuilder().addComponents(bountyValue);
			const repeatActionRow = new ActionRowBuilder().addComponents(repeatBounty)
			modal.addComponents(tierActionRow, nameActionRow, descriptionActionRow, valueActionRow, repeatActionRow);
			await interaction.showModal(modal);
		}
};