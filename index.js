// Import discord.js and create the client
const { Client, Intents } = require('discord.js');
const { token,server_ID } = require('./credentials.json');
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
client.on('ready', () => {
	console.log(`We are in as ${client.user.tag}!`);
  })
  
client.on('messageReactionAdd', async (reaction, user,message) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
	}
  console.log(user.id);
});
client.on('messageReactionRemove', async (reaction, user,message) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
	}
  console.log(user.id);
  const myGuild = client.guilds.cache.get(server_ID);
  const myRole = myGuild.roles.cache.find(role => role.name === 'red');
  const User = client.users.cache.get(user.id); 
  User.roles.add(myRole);
});
client.login(token);