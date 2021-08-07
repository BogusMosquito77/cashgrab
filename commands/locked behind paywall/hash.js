/* eslint-disable no-empty-function */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
const { MessageEmbed, MessageMentions } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
	name: 'hash',
	aliases:['sha256'],
	run: async (client, message, args) => {
		const { sha256 } = require('../../functions.js');
		if (!args[0]) {return message.channel.send('you need some arguments!');}
		message.channel.send(`sha256: ${sha256(args.join(' '))}`);
	} };