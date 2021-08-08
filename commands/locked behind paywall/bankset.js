/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
const { MessageEmbed, MessageMentions } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
	name: 'bankset',
	aliases:['bs', 'bset'],
	run: async (client, message, args) => {
		const me = ('647466955623759883');
		if (!me.includes(message.author.id)) {
			const ahhdamn = new MessageEmbed()
				.setTitle('You can\'t run this')
				.setDescription('You aren\'t the developer dude, sorry.');
			message.channel.send({ embeds: [ahhdamn] });
			return;
		}
		else {
			const user = message.mentions.members.first() || message.author;
			let userid;
			if (!message.mentions.members.first() && args[1]) {userid = args[1];}
			else {userid = user.id;}
			const balanceSchema = require('../../schemas/balanceSchema');
			const data = await balanceSchema.findOne({ UserID: userid });
			data.bank = args[0];
			data.save();
			message.channel.send(`I set ${client.users.cache.get(userid).username}'s bank to ${args[0].toLocaleString()} coins!`);
		}
	} };
