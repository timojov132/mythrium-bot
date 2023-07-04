const { SlashCommandBuilder, Message } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bountylist')
		.setDescription('View Full Bounty List'),
		async execute(interaction) {
            await interaction.reply({content: "https://docs.google.com/spreadsheets/d/1E9M17fHXv89gFq4CIXdf-QSxEXrdWquRti9v3Z7hebM/edit?usp=sharing", ephemeral: true})
            //const bountyList = JSON.parse(fs.readFileSync('./bounties.json'));
            //var bountyString = "";
            //for (var i = 0; i < bountyList.length; i++) {
            //    bountyString = bountyString + `${bountyList[i].value} Mythrium for ${bountyList[i].label}: ${bountyList[i].description}\n`
            //}
            //fs.writeFileSync('./temp/bounties.txt', bountyString, function (err) {
            //    if (err) { throw err;
            //    } else {console.log('Saved!');}
            //  })
            //  await interaction.reply({ content: bountyString, ephemeral: true, components: [] });
        }
    }