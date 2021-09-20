// Import discord.js and create the client
const Discord = require('discord.js')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const { token } = require('./credentials.json');

// Register an event so that when the bot is ready, it will log a messsage to the terminal
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const channel = client.channels.cache.find(channel => channel.id === "889596343109185557")
    channel.send("Choose your name color here \n 1 for cyan 2 for teal 3 for range 4 for yellow 5 for black 6 for purple 7 fr red 8 for pink 9 for lime 10 for blue cyan")
})
// client.login logs the bot in and sets it up for use. You'll enter your token here.
client.login(token);