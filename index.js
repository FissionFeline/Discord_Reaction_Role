// Import discord.js and create the client
const Discord = require('discord.js')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const { token } = require('./credentials.json');

// Register an event so that when the bot is ready, it will log a messsage to the terminal
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})


// client.login logs the bot in and sets it up for use. You'll enter your token here.
client.login(token);