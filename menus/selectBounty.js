const { claimBounty } = require('../functions/bankTransactions.js')

module.exports = {
	data: {"menu" : [{"name":"selectBounty", "description":"Select Menu claiming the selected bounty"}]},
    async execute(interaction) {
        const bountyInfo = claimBounty(interaction.user, interaction.values[0], interaction.createdAt)
		await interaction.update({ content: `You have successfuly claimed the bounty. There are ${bountyInfo[0]} of these bounties remaining`, components: [] });
		await interaction.channel.send(`${interaction.user} has claimed ${bountyInfo[1]} for ${bountyInfo[2]} Mythrium`)
    }
}