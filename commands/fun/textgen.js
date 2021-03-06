/* eslint-disable no-var */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const deepai = require('deepai');
module.exports = {
	name: 'gentext',
	aliases: ['gen-text', 'textgen', 'text-gen'],
	run: async (client, message, args) => {
		if (!args[0]) {return message.channel.send('You need some text!');}
		deepai.setApiKey(process.env.deepaikey);
		(async function() {
			var resp = await deepai.callStandardApi("text-generator", {
				text: args.join(' '),
			});
			message.channel.send(resp.output);
		})();
	} };