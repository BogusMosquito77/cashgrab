const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'ping',
	aliases: ['pong'],
	// eslint-disable-next-line no-unused-vars
	run: async (client, message, args) => {
		const start = Date.now();
		message.channel.send({ embed: { description: '🏓pinging...', color: 0x00FFFF } }).then(m => {
			const end = Date.now();
			// define embed
			const embed = new MessageEmbed()
			// looks
				.setAuthor('🏓Pong!', message.author.avatarURL())
			// api latency
				.addField('API Latency', Math.round(client.ws.ping) + 'ms', true)
			// message latency found by subtracting end time with start time
				.addField('Message Latency', end - start + 'ms', true)
				.setColor(0x00FFFF);
			// editing msg and if err send the err
			m.edit({ embeds: [embed] }).catch(e => message.channel.send(e));
		});
	} };