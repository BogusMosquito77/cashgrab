/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

// eslint-disable-next-line no-unused-vars
const { Client, Collection, Message, MessageEmbed } = require('discord.js');
const disbut = require('discord-buttons');

// eslint-disable-next-line no-unused-vars
const { config } = require('dotenv');
const fs = require('fs');
const client = new Client({ disableMentions: 'everyone', ws: { properties: { $browser: 'STREAMING' }, intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES'] } });
disbut(client);
require('dotenv').config({ path: __dirname + '/.env' });
// mongo here?

const mongoAtlasUri =
  'mongodb+srv://BogusMosquito77:kibo2007@cluster0.u1me0.mongodb.net/cashgrab?retryWrites=true&w=majority';

try {
	// Connect to the MongoDB cluster
	mongoose.connect(
		mongoAtlasUri,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		() => console.log(' Mongoose is connected'),
	);
}
catch (e) {
	console.log('could not connect');
}

const dbConnection = mongoose.connection;
dbConnection.on('error', (err) => console.log(`Connection error ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));
// here?
client.commands = new Collection();
client.aliases = new Collection();
console.log('config');


client.categories = fs.readdirSync('./commands/');
['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
	console.log('ready!');
	client.user.setActivity(' ' + client.users.cache.size + ' Users and ' + client.guilds.cache.size + ' Servers', { type: 'WATCHING' });
});
client.on('message', async message => {
	const prefixSchema = require('./schemas/prefixSchema');
	const prefixData = await prefixSchema.findOne({ GuildID: message.guild.id,
	});
	if (!prefixData) {
		const newprefixdata = new prefixSchema({
			prefix: '&',
			GuildID: message.guild.id,
		});
		newprefixdata.save();
		return;
	}
	const prefix = prefixData.prefix;
	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.member) message.member = await message.guild.members.fetch(message);

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));

	if (command) {command.run(client, message, args);}

	let messages;

	fs.readdir('./events/', (err, files) => {
		if (err) return console.error;
		files.forEach(file => {
			if (!file.endsWith('.js')) return;
			const evt = require(`./events/${file}`);
			const evtName = file.split('.')[0];
			console.log(`Loaded event '${evtName}'`);
			client.on(evtName, evt.bind(null, client));
		});
	});
});
client.on('message', async message => {
	if (message.author.bot) return;
	const settingsSchema = require('./schemas/settingsSchema');
	const settings = await settingsSchema.findOne({ UserID: message.author.id });
	const balanceSchema = require('./schemas/balanceSchema');
	const cooldownSchema = require('./schemas/cooldownSchema');
	const cooldowndata = await cooldownSchema.findOne({ UserID: message.author.id });
	const balancedata = await balanceSchema.findOne({ UserID: message.author.id });
	if (!settings) {
		const newdata = new settingsSchema({
			mode: 'normal',
			UserID: message.author.id,
		});
		newdata.save();
	}

	// dis just if there is no cooldowndata for anyone
	if (!cooldowndata) {
		// eslint-disable-next-line no-var
		var newcooldowndata = new cooldownSchema({
			howgay: 0,
			beg: 0,
			bet: 0,
			slot: 0,
			blackjack: 0,
			OwnerCooldown: true,
			UserID: message.author.id,
		});
		newcooldowndata.save();
	}
	if (!balancedata) {
		const newbalancedata = new balanceSchema({
			wallet: 0,
			bank: 0,
			total: 0,
			cwallet: 0,
			cbank: 0,
			ctotal: 0,
			UserID: message.author.id,
		});
		newbalancedata.save();
	}
});
client.login(process.env.token);
