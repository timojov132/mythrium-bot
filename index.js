const Discord = require("discord.js")
const config  = require("./config.json")
const heroes  = require("./heroes.json")

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions] });

const prefix = "!";

client.channels.cache.get('id').send("Test");


client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  if (message.content === "!222")  {
    let tanks = [];
    let dps = [];
    let support = [];

    tanks.push(heroes.tanks[Math.floor(Math.random() * heroes.tanks.length)]);
    while (tanks.length < 2) {
      nu_tank = heroes.tanks[Math.floor(Math.random() * heroes.tanks.length)];
      if (tanks[0] != nu_tank) {
        tanks.push(nu_tank);
      }
    }

    dps.push(heroes.dps[Math.floor(Math.random() * heroes.dps.length)]);
    while (dps.length < 2) {
      nu_dps = heroes.dps[Math.floor(Math.random() * heroes.dps.length)];
      if (dps[0] != nu_dps) {
        dps.push(nu_dps);
      }
    }

    support.push(heroes.support[Math.floor(Math.random() * heroes.support.length)]);
    while (support.length < 2) {
      nu_support = heroes.support[Math.floor(Math.random() * heroes.support.length)];
      if (support[0] != nu_support) {
        support.push(nu_support);
      }
    }

    tanks = tanks.sort()
    dps = dps.sort()
    support = support.sort()

    message.channel.send(tanks[0] + ", " + tanks[1] + ", " + dps[0] + ", " + dps[1] + ", " + support[0] + ", " + support[1])
  }
});

client.login(config.token);