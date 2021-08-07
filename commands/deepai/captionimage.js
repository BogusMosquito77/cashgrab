/* eslint-disable no-var */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const deepai = require('deepai');
module.exports = {
	name: 'caption',
	aliases: ['caption-image', 'imagecaption', 'image-caption'],
	run: async (client, message, args) => {
		if (!message.attachments.first()) {return message.channel.send('You need an image!');}
		if (!message.attachments.first().width) {return message.channel.send('You need an image!');}
		deepai.setApiKey('f9286878-3290-48d6-90b5-5a057277faf4');
		(async function() {
			var resp = await deepai.callStandardApi("neuraltalk", {
				image: message.attachments.first().proxyURL,
			});
			message.channel.send(`the caption the AI generated for your image is: \n${resp.output}`);
		})();
	} };