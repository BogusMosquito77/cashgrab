/* eslint-disable max-statements-per-line */
/* eslint-disable no-unused-vars */
const { MessageEmbed, MessageMentions } = require('discord.js');
module.exports = {
	name: 'cooldown',
	aliases:['ownercool'],
	run: async (client, message, args) => {
		const me = ('647466955623759883');
		if (!me.includes(message.author.id)) {
			const ahhdamn = new MessageEmbed()
				.setTitle('You can\'t run this')
				.setDescription('You aren\'t the developer dude, sorry.');
			message.channel.send(ahhdamn);
			return;
		}
		const user = message.mentions.members.first() || message.author;
		let userid;
		if (!message.mentions.members.first() && args[1]) {userid = args[1];}
		else {userid = user.id;}
		const cooldownSchema = require('../../schemas/cooldownSchema');
		const cooldowndata = await cooldownSchema.findOne({ UserID: userid });
		const acceptedkeywords = ['true', 'false'];
		if (!acceptedkeywords.includes(args[0])) {message.channel.send('true or false!'); return;}
		cooldowndata.OwnerCooldown = args[0];
		cooldowndata.save();
		message.channel.send(`cooldowns are ${args[0]}`);
	} };