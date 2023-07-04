const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, InteractionType } = require('discord.js');
const { token } = require('./config.json');

var interactReturn;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.modals = new Collection();
client.buttons = new Collection();
client.menus = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const menusPath = path.join(__dirname, 'menus');
const menuFiles = fs.readdirSync(menusPath).filter(file => file.endsWith('.js'));
const buttonsPath = path.join(__dirname, 'buttons');
const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
const modalsPath = path.join(__dirname, 'modals');
const modalFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

for (const file of buttonFiles) {
	const filePath = path.join(buttonsPath, file)
	const button = require(filePath);
	client.buttons.set(button.data.button[0].name, button);
}

for (const file of menuFiles) {
	const filePath = path.join(menusPath, file)
	const menu = require(filePath);
	client.menus.set(menu.data.menu[0].name, menu);
}

for (const file of modalFiles) {
	const filePath = path.join(modalsPath, file)
	const modal = require(filePath);
	client.modals.set(modal.data.modal[0].name, modal);
}

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}}

//client.on('interactionCreate', async interaction => {
	//if (!interaction.isSelectMenu()) return;

	//if (interaction.customId === 'selectTier'){

	//}
	//if (interaction.customId === 'selectCategory') {

	//}
	//if (interaction.customId === 'selectBounty') {
	//	const bountyInfo = claimBounty(interaction.user, interaction.values[0], interaction.createdAt)
	//	await interaction.update({ content: `You have successfuly claimed the bounty. There are ${bountyInfo[0]} of these bounties remaining`, components: [] });
	//	await interaction.channel.send(`${interaction.user} has claimed ${bountyInfo[1]} for ${bountyInfo[2]} Mythrium`)
	//}
	//if (interaction.customId === 'leaderboard') {
	//	const bankSort = Leaderboard(interaction.values[0]);
	//	await interaction.update({ content: bankSort, components: [] });
	//}
//});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		interactReturn = await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (error.code === 50035) {
			await interaction.reply({ content: 'There are no bounties to claim right now', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;
	const menu = client.menus.get(interaction.customId);

	try {
		await menu.execute(interaction, interactReturn)
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this menu!', ephemeral: true });
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;
	const button = client.buttons.get(interaction.customId);

	try {
		await button.execute(interaction, interactReturn)
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this modal!', ephemeral: true });
	}
});

client.on('interactionCreate', async interaction => {
	if (interaction.type !== InteractionType.ModalSubmit) return;
	const modal = client.modals.get(interaction.customId);

	try {
		await modal.execute(interaction, interactReturn)
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this modal!', ephemeral: true });
	}
});

client.login(token);