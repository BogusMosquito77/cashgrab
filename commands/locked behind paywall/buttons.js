/* eslint-disable no-unused-vars */
const { MessageEmbed, MessageMentions, discord } = require('discord.js');
const { MessageButton, disbut } = require('discord-buttons');
module.exports = {
	name: 'buttons',
	aliases:['assons'],
	run: async (client, message, args) => {
		const me = ('647466955623759883');
		if (!me.includes(message.author.id)) {
			const ahhdamn = new MessageEmbed()
				.setTitle('You can\'t run this')
				.setDescription('You aren\'t the developer dude, sorry.');
			message.channel.send({ embeds: [ahhdamn] });
			return;
		}
		else{
			const button = new MessageButton()
				.setLabel('click here to send hi')
				.setStyle('blurple')
				.setID('like_button');

			await message.channel.send('content', { component: button });
			// eslint-disable-next-line no-shadow
			client.on('clickButton', async (button) => {
				await button.reply.send(`hi, we are in the channel ${button.channel} in the guild ${button.guild}, ${button.clicker.user.username}`);
			});
		}
	} };