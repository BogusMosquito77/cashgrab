/* eslint-disable no-empty-function */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
const { MessageEmbed, MessageMentions } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
	name: 'substring',
	aliases:['string'],
	run: async (client, message, args) => {
		if (!args[0]) {return message.channel.send('you need some arguments!');}
		message.channel.send(`first 3 letter are: ${args[0].substring(0, 3)}`);
	} };