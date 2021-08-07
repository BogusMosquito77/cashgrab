/* eslint-disable no-unused-vars */
/* eslint-disable comma-spacing */
/* eslint-disable no-var */
/* eslint-disable max-statements-per-line */
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'bal',
	aliases: ['balance' , 'wallet'],
	run: async (client, message, args) => {
		const user = message.mentions.members.first() || message.author;
		let userid;
		if (!message.mentions.members.first() && args[0]) {userid = args[0];}
		else {userid = user.id;}
		const balanceSchema = require('../../schemas/balanceSchema');
		const data = await balanceSchema.findOne({ UserID: userid });
		let avatar;
		if (message.mentions.members.first()) {avatar = user.user.displayAvatarURL();}
		else if (!args[0]) {avatar = user.displayAvatarURL();}
		else {avatar = client.users.cache.get(args[0]).displayAvatarURL();}
		if (data) {

			// eslint-disable-next-line no-var
			var wallet = data.wallet; var bank = data.bank;
			// eslint-disable-next-line no-var
			// eslint-disable-next-line no-redeclare
			const plus = wallet + bank;
			const balanceembed = new MessageEmbed()
				.setAuthor(client.users.cache.get(userid).username, avatar)
				.setTitle(`${client.users.cache.get(userid).username}'s balance`)
				.setDescription(`**wallet:** ${wallet.toLocaleString()} coins.\n **bank:** ${bank.toLocaleString()} coins.\n **total:** ${plus.toLocaleString()} coins.`)
				.setColor('1207d6');
			message.channel.send(balanceembed);
		}
		else {
			const newdata = new balanceSchema({
				wallet: 0,
				bank: 0,
				total: 0,
				cwallet: 0,
				cbank: 0,
				ctotal: 0,
				UserID: userid,
			});
			newdata.save();

			const balanceembed = new MessageEmbed()
				.setAuthor(client.users.cache.get(user.id).username, avatar)
				.setTitle(`${client.users.cache.get(user.id).username}'s balance`)
				.setDescription('wallet: no coins.\n bank: no coins.\n So in total: no coins. Get some coins will you?')
				.setColor('1207d6');
			message.channel.send(balanceembed);
		}
	} };