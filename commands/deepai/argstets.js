/* eslint-disable no-var */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const deepai = require('deepai');
module.exports = {
	name: 'test',
	run: async (client, message, args) => {

		console.log(message.attachments.first().proxyURL);

	} };