// Import discord.js and create the client
const { Client, Intents, ReactionUserManager } = require('discord.js');
const token = process.env.key
const config = require('./config.json');
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
client.on('ready', () => {
	console.log(`We are in as ${client.user.tag}!`);
	client.user.setActivity("加强中国审查"); 
});
client.on('messageReactionAdd', async (reaction, user,message) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('We had a fucky wucky: ', error);
			return;
		}
	}
	try {
		const TMP_config = config[reaction.message.guild.id][reaction.message.id];
		const TPM_Guild = client.guilds.cache.get(reaction.message.guild.id);
		if(TMP_config[reaction.emoji.name] == undefined) {
			return;
		}
		const TPM_Role = TPM_Guild.roles.cache.find(role => role.name === TMP_config[reaction.emoji.name]);
		const member = TPM_Guild.members.cache.find(member => member.id === user.id); //find the member who reacted (because user and member are seperate things)
		member.roles.add(TPM_Role); //assign selected role to member
	}
	catch(error) {
		console.error('Someone fucked up ',error)
	}
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
	try {
		const TMP_config = config[reaction.message.guild.id][reaction.message.id];
		const TPM_Guild = client.guilds.cache.get(reaction.message.guild.id);
		if(TMP_config[reaction.emoji.name] == undefined) {
			return;
		}
		const TPM_Role = TPM_Guild.roles.cache.find(role => role.name === TMP_config[reaction.emoji.name]);
		const member = TPM_Guild.members.cache.find(member => member.id === user.id); //find the member who reacted (because user and member are seperate things)
		member.roles.remove(TPM_Role); //assign selected role to member
	}
	catch(error) {
		console.error('Someone fucked up ',error)
	}
});
client.login(token);
