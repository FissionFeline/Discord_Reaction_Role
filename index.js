// Import discord.js and create the client
const { Client, Intents, ReactionUserManager } = require('discord.js');
const { token,server_ID } = require('./credentials.json');
const config = require('./config.json');
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
client.on('ready', () => {
	console.log(`We are in as ${client.user.tag}!`);
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
    var TMP_config = config[reaction.message.guild.id][reaction.message.id];
    const TPM_Guild = client.guilds.cache.get(reaction.message.guild.id);
    const TPM_Role = TPM_Guild.roles.cache.find(role => role.name === TMP_config[reaction.emoji.name]);
	const myGuild = client.guilds.cache.get(reaction.message.guild.id);
	const member = myGuild.members.cache.find(member => member.id === user.id); //find the member who reacted (because user and member are seperate things)

	member.roles.add(TPM_Role); //assign selected role to member
	
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
	const myGuild = client.guilds.cache.get(reaction.message.guild.id);
	const member = myGuild.members.cache.find(member => member.id === user.id); //find the member who reacted (because user and member are seperate things)

	member.roles.remove(TPM_Role); //assign selected role to member
  //RemoveRole(user.id,myGuild);
});
client.login(token);
