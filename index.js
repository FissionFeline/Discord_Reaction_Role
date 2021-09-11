// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./credentials.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});
client.on('guildMemberAdd', member => {
    member.guild.channels.get('channelID').send("Welcome you cumstain"); 
});
// Login to Discord with your client's token
client.login(token);