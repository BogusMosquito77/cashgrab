/* eslint-disable no-var */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const deepai = require('deepai');
module.exports = {
	name: 'nudity',
	aliases: ['detect-nudity', 'nudedetector', 'nsfw-detector', 'nude'],
	run: async (client, message, args) => {
		if (!message.attachments.first()) {return message.channel.send('You need an image!');}
		if (!message.attachments.first().width) {return message.channel.send('You need an image!');}
		deepai.setApiKey('f9286878-3290-48d6-90b5-5a057277faf4');
		(async function() {
			var resp = await deepai.callStandardApi("nsfw-detector", {
				image: message.attachments.first().proxyURL,
			});
			message.channel.send(`There is a ${resp.output.nsfw_score * 100}% chance this image includes nudity.`);
		})();
	} };