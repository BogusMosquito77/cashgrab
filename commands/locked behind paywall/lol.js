/* eslint-disable no-unused-vars */
const { MessageEmbed, MessageMentions } = require('discord.js');
module.exports = {
	name: 'testtt',
	aliases:['function'],
	run: async (client, message, args) => {
		const { addmoney } = require('../../random.js');
		addmoney(message.content);
	} };