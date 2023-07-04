const bountiesFile = require('../bounties.json');
const fs = require('node:fs');

module.exports = {
	data: {"modal" : [{"name":"addBounty", "description":"Modal that adds bounties to JSON file"}]},
    async execute(interaction) {
        const label = interaction.fields.getTextInputValue('bountyName');
		    const description = interaction.fields.getTextInputValue('bountyDescription');
        const value = interaction.fields.getTextInputValue('bountyValue');
        const tier = parseInt(interaction.fields.getTextInputValue('bountyTier'));
        const repeat = interaction.fields.getTextInputValue('repeatBounty');
        bountiesFile.push({"tier":tier,"label":label,"description":description,"value":value,"repeat":repeat})
        fs.writeFileSync('bounties.json', JSON.stringify(bountiesFile), function (err) {
            if (err) { throw err;
            } else {console.log('Saved!');}
          })
		await interaction.reply({ content: `Bounty ${label}: ${description} has been added for ${value} Mythrium`});     
    }
}