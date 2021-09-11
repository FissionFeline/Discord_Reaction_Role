// imports shit and the client thing
const { Client, Intents } = require('discord.js');
const { token } = require('./credentials.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// logger if everythings okie dokie
client.once('ready', () => {
	console.log('Everything okie dokei');
});
//welcome message
client.on('guildMemberAdd', member => {
    member.guild.channels.get('channelID').send("Welcome you cumstain"); 
});

//login what else ?
client.login(token);