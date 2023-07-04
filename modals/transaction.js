const { transfer } = require('../functions/bankTransactions.js');

var modal;

module.exports = {
	data: {"modal" : [{"name":"transaction", "description":"Modal that tracks and records payments between players"}]},
    async execute(interaction, modalReturn) {
        const payment = interaction.fields.getTextInputValue('paymentInput');
		const reason = interaction.fields.getTextInputValue('reasonInput');
		const transferSuccess = transfer(modalReturn[0], modalReturn[1], payment, reason, interaction.createdAt);
		if (transferSuccess === 1){
			await interaction.reply({ content: `${modalReturn[0]} is paying ${payment} ╔╦╗ to ${modalReturn[1]} for ${reason}`});
		} else if (transferSuccess === 0) {
			await interaction.reply({ content: `${modalReturn[0]} is trying to write checks his body can't cash`});
		} else {
			await interaction.reply({ content: `${modalReturn[0]} is so broke he can't even pay negative`});
		};      
    }
}