/* eslint-disable no-var */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const deepai = require('deepai');
module.exports = {
	name: 'detectobject',
	aliases: ['object-detection', 'objectdetect', 'detect-object', 'objects'],
	run: async (client, message, args) => {
		if (!message.attachments.first()) {return message.channel.send('You need an image!');}
		if (!message.attachments.first().width) {return message.channel.send('You need an image!');}
		deepai.setApiKey('f9286878-3290-48d6-90b5-5a057277faf4');
		(async function() {
			var resp = await deepai.callStandardApi("densecap", {
				image: message.attachments.first().proxyURL,
			});
			console.log(resp.output.captions);
		})();
	} };