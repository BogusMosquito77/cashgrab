/* eslint-disable no-var */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const deepai = require('deepai');
module.exports = {
	name: 'imggen',
	aliases: ['imagegen', 'genimage', 'img-gen', 'gen-image', 'imagine-gen', 'text2img', 'text2image', 'texttoimg', 'texttoimage'],
	run: async (client, message, args) => {
		deepai.setApiKey('f9286878-3290-48d6-90b5-5a057277faf4');
		(async function() {
			var resp = await deepai.callStandardApi("text2img", {
				text: args.join(' '),
			});
			message.channel.send(resp.output_url);
		})();
	} };