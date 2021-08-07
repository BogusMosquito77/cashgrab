/* eslint-disable no-empty-function */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
const { MessageEmbed, MessageMentions } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
	name: 'walletadd',
	aliases:['wa', 'wadd'],
	run: async (client, message, args) => {
		const me = ('647466955623759883');
		if (!me.includes(message.author.id)) {
			const ahhdamn = new MessageEmbed()
				.setTitle('You can\'t run this')
				.setDescription('You aren\'t the developer dude, sorry.');
			message.channel.send(ahhdamn);
			return;
		}
		else {
			const user = message.mentions.members.first() || message.author;
			let userid;
			if (args[1] != message.mentions.members.first() && args[1]) {userid = args[1];}
			else {userid = user.id;}
			const balanceSchema = require('../../schemas/balanceSchema');
			const data = await balanceSchema.findOne({ UserID: userid });
			const query = { UserID: user.id };
			const update = { $inc: { wallet: args[0] } };
			const options = { 'new': true, 'useFindAndModify' : false };
			balanceSchema.findOneAndUpdate(query, update, options, function(err, doc) {});
			data.save();
			message.channel.send(`I added ${args[0].toLocaleString()} coins to ${client.users.cache.get(userid).username}'s wallet`);
		}
	} };
