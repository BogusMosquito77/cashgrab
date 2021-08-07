/* eslint-disable max-statements-per-line */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
/* eslint-disable no-empty-function */
/* eslint-disable no-var */
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'share',
	aliases:['pay'],
	run: async (client, message, args) => {
		// mongodb stuff
		const { addwallet } = require('../../functions.js');
		const user = message.mentions.members.first() || message.author;
		let userid;
		if (!message.mentions.members.first() && args[0]) {userid = args[0];}
		else {userid = user.id;}
		const balanceSchema = require('../../schemas/balanceSchema');
		const sdata = await balanceSchema.findOne({ UserID: message.author.id });
		const rdata = await balanceSchema.findOne({ UserID: userid });
		if (!sdata) {
			const newsbalancedata = new balanceSchema({
				wallet: 0,
				bank: 0,
				total: 0,
				cwallet: 0,
				cbank: 0,
				ctotal: 0,
				UserID: message.author.id,
			});
			newsbalancedata.save();
		}
		if (!rdata) {
			const newrbalancedata = new balanceSchema({
				wallet: 0,
				bank: 0,
				total: 0,
				cwallet: 0,
				cbank: 0,
				ctotal: 0,
				UserID: userid,
			});
			newrbalancedata.save();
		}
		const swallet = sdata.wallet;
		if (sdata.wallet <= 0) {return message.channel.send('You don\'t have any money lol');}
		if (sdata && rdata) {
			const keywords = ['all', 'max', 'everything'];

			if (args[1] < 1 && !keywords.includes(args[1])) {message.channel.send('You can\'t deposit zero or negative coins, dumbass!'); return;}
			if (isNaN(args[1]) && !keywords.includes(args[1])) {message.channel.send('You can\'t deposit words, dumbass!'); return;}
			if (args[1].indexOf('.') > -1) {message.channel.send('No decimals!'); return;}
			if (keywords.includes(args[1])) {
				addwallet(swallet, userid);
				addwallet(-swallet, message.author.id);
				return message.channel.send(`Shared ${swallet} coins with ${client.users.cache.get(userid).username}.`);
			}
			addwallet(args[1], userid);
			addwallet(-args[1], message.author.id);
			message.channel.send(`Shared ${args[1]} coins with ${client.users.cache.get(userid).username}.`);
		}
	},
};