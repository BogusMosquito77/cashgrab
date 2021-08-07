/* eslint-disable no-unused-vars */
const { MessageEmbed, MessageMentions } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
	name: 'totalset',
	aliases:['settotal', 'totalbalset'],
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
			const totalbalanceSchema = require('../../schemas/totalbalanceSchema');
			const data = await totalbalanceSchema.findOne();
			data.balance = args[0];
			data.save();
			message.channel.send(`I set the total balance to ${args[0]}`);
		}
	} };