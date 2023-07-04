const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bounty')
		.setDescription('Claim mythrium for completing a bounty'),
		async execute(interaction) {
			const modal = new ModalBuilder()
				.setCustomId('bounty')
				.setTitle('Claim Bounty');
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
				.setLabel("How much was this bounty (Look at Google Doc)")
				.setStyle(TextInputStyle.Short);

			const nameActionRow = new ActionRowBuilder().addComponents(bountyName);
			const descriptionActionRow = new ActionRowBuilder().addComponents(bountyDescription);
			const valueActionRow = new ActionRowBuilder().addComponents(bountyValue);
			modal.addComponents(nameActionRow, descriptionActionRow, valueActionRow);
			await interaction.showModal(modal);
		}
};
	//data: new SlashCommandBuilder()
	//	.setName('bounty')
	//	.setDescription('Claim a bounty and get Mythrium'),
	//	async execute(interaction) {
	//		const row = new ActionRowBuilder()
	//			.addComponents(
	//				new SelectMenuBuilder()
	//					.setCustomId('select')
	//					.setPlaceholder('Select a Bounty')
	//			);
	//			const bounties = JSON.parse(fs.readFileSync('./bounties.json', 'utf8'));
				//for (var i = 0; i < bounties.length; i++) {
				//		console.log(row.components[0])
				//		row.components[0].addOptions([{
				//			label: `${bounties[i].label}`,
				//			description: `${bounties[i].description.slice(0, 80)}`,
				//			value: `${i}`,
				//		}]);
				//}

			
		//	await interaction.reply({ content: 'Select which bounty you want to claim', ephemeral: true, components: [row] });
		//}
//};