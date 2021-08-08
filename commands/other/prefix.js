/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'prefix',
	aliases: ['pref'],
	// eslint-disable-next-line no-unused-vars
	run: async (client, message, args) => {
		const prefixSchema = require('../../schemas/prefixSchema');
		const prefixData = await prefixSchema.findOne({ GuildID: message.guild.id,
		});
		if(!args[0]) {return message.channel.send('uhhh.. prefix please?');}
		if (message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD, Permissions.FLAGS.ADMINISTRATOR) && args[0] === prefixData.prefix) {
			const same = new MessageEmbed()
				.setTitle('invalid prefix')
				.setDescription('the prefix you entered is the same as your previous prefix!');
			message.channel.send({ embeds: [same] });
		}
		else if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD, Permissions.FLAGS.ADMINISTRATOR)) {
			prefixData.prefix = args[0];
			prefixData.save();
			const done = new MessageEmbed()
				.setTitle('Prefix was changed.')
				.setDescription(`${message.author.username} changed the prefix to: ${prefixData.prefix}`)
				.setColor('1207d6');
			message.channel.send({ embeds: [done] });
		}
		else {
			const permsnone = new MessageEmbed()
				.setTitle('not enough permissions!')
				.setDescription('you don\'t have enough permissions to change the prefix!');
			message.channel.send({ embeds: [permsnone] });
		}
	} };