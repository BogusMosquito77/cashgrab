/* eslint-disable no-unused-vars */
const { MessageEmbed, MessageMentions } = require('discord.js');
module.exports = {
	name: 'switch',
	run: async (client, message, args) => {
		switch (args[0]) {
		case 'poop':
			message.channel.send('grow up');
			break;
		case 'shit':
			message.channel.send('fuck');
			break;
		default:
			break;
		}
	} };