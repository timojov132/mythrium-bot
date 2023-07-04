const fs = require('node:fs');
const { findUsers } = require('../functions/bankTransactions.js')

module.exports = {
	data: {"modal" : [{"name":"bounty", "description":"Modal that allows you to claim mythrium for bounty"}]},
    async execute(interaction) {
        const bank = JSON.parse(fs.readFileSync('./bank.json', 'utf8'));
        const label = interaction.fields.getTextInputValue('bountyName');
		const description = interaction.fields.getTextInputValue('bountyDescription');
        const value = interaction.fields.getTextInputValue('bountyValue');
        const user = findUsers(interaction.user.tag);
        bank[user[0]].mythrium = bank[user[0]].mythrium + parseInt(value);
        console.log(bank[user[0]].bounties)
        bank[user[0]].bounties = bank[user[0]].bounties + 1;
        console.log(bank[user[0]].bounties)
        bank[user[0]].bountyRewards = bank[user[0]].bountyRewards + parseInt(value);
        fs.writeFileSync('bank.json', JSON.stringify(bank), function (err) {
            if (err) { throw err;
            } else {console.log('Saved!');}
          })
        fs.appendFile('log.txt', `Bounty ${label}: ${description} has been claimed for ${value} Mythrium by ${interaction.user} {${interaction.createdAt}}`, function (err) {
            if (err) { throw err; 
            } else {console.log('Appended!');}
        })
		await interaction.reply({ content: `Bounty ${label}: ${description} has been claimed for ${value} Mythrium by ${interaction.user}`});     
    }
}