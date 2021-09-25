// Import discord.js and create the client
const { Client, Intents } = require('discord.js');
const { token,server_ID } = require('./credentials.json');
const config = require('./config.json');
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
client.on('ready', () => {
	console.log(`We are in as ${client.user.tag}!`);
});
client.on('messageReactionAdd', async (reaction, _user,message) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('We had a fucky wucky: ', error);
			return;
		}
	}
    var TMP_config = config[reaction.message.guild.id][reaction.message.id];
    const TPM_Guild = client.guilds.cache.get(reaction.message.guild.id);
    const TPM_Role = TPM_Guild.roles.cache.find(role => role.name === TMP_config[reaction.emoji.name]);
	const myGuild = client.guilds.cache.get(reaction.message.guild.id);
	const us = client.users.cache.find(user => user.id === _user.id);
	us.roles.add(TPM_Role);
  //user.guild.roles.add(TPM_Role);
});
client.on('messageReactionRemove', async (reaction, user,message) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('We had a fucky wucky:', error);
			return;
		}
	}
	var TMP_config = config[reaction.message.guild.id][reaction.message.id];
	const TPM_Guild = client.guilds.cache.get(reaction.message.guild.id);
	const TPM_Role = TPM_Guild.roles.cache.find(role => role.name === TMP_config[reaction.emoji.name]);
  //RemoveRole(user.id,myGuild);
});
client.login(token);
