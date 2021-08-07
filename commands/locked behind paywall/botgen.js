const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'generate',
	aliases: ['gen'],
	run: async (client, message, args) => {
		const moderator_perms = '406940870';
		const basic_perms = '3072';
		const no_perms = '0';
		const admin_perms = '8';
		// checks if nothing is given
		if (args [0] === undefined) {
			const help = new MessageEmbed()
				.setTitle('How to use?')
				.setDescription('you can do 2 things: \n\
  1. @mention perms (perms are none,basic,moderator,admin. you don\'t need to type none)\n2.bot-id perms');
			message.channel.send(help);
		}
		// id
		else if (!message.mentions.users.first()) {
			if (isNaN(args[0]) === true) {
				const bot_noid = new MessageEmbed()
					.setTitle('Please do a valid id.')
					.setDescription('Please do a valid id. eg: 761253652282998834');
				message.channel.send(bot_noid);
			}
			else if (isNaN(args[0]) === false) {
				const bot_noping = new MessageEmbed()
					.setTitle('i generated.')
					.setDescription(`[get your link here!](https://discord.com/api/oauth2/authorize?client_id=${args[0]}&permissions=0&scope=bot)  (please note that this may not be a bot user)`);
				message.channel.send(bot_noping);
			}

		}

		// gives moderator perms link
		else if (message.mentions.users.first().bot, args[1] === 'moderator') {
			const bot_id = message.mentions.members.first().id;
			const bot_ping = new MessageEmbed()
				.setTitle('i generated.')
				.setDescription(`[get your moderator permissions link here!](https://discord.com/api/oauth2/authorize?client_id=${bot_id}&permissions=${moderator_perms}&scope=bot)`);
			message.channel.send(bot_ping);
		}
		// gives no perms link
		else if (message.mentions.users.first().bot, args[1] === undefined || message.mentions.users.first().bot, args[1] === 'none') {
			const bot_id = message.mentions.members.first().id;
			const bot_ping = new MessageEmbed()
				.setTitle('i generated.')
				.setDescription(`[get your no permissions link here!](https://discord.com/api/oauth2/authorize?client_id=${bot_id}&permissions=${no_perms}&scope=bot)`);
			message.channel.send(bot_ping);
		}
		else if (message.mentions.users.first().bot, args[1] === undefined) {
			const bot_id = message.mentions.members.first().id;
			const bot_ping = new MessageEmbed()
				.setTitle('i generated.')
				.setDescription(`[get your no permissions link here!](https://discord.com/api/oauth2/authorize?client_id=${bot_id}&permissions=${no_perms}&scope=bot)`);
			message.channel.send(bot_ping);
		}
		// gives admin perms link
		else if (message.mentions.users.first().bot, args[1] === 'admin') {
			const bot_id = message.mentions.members.first().id;
			const bot_ping = new MessageEmbed()
				.setTitle('i generated.')
				.setDescription(`[get your admin permissions link here!](https://discord.com/api/oauth2/authorize?client_id=${bot_id}&permissions=${admin_perms}&scope=bot)`);
			message.channel.send(bot_ping);
		}
		// gives basic perms link
		else if (message.mentions.users.first().bot, args[1] === 'basic') {
			const bot_id = message.mentions.members.first().id;
			const bot_ping = new MessageEmbed()
				.setTitle('i generated.')
				.setDescription(`[get your basic permissions link here!](https://discord.com/api/oauth2/authorize?client_id=${bot_id}&permissions=${basic_perms}&scope=bot)`);
			message.channel.send(bot_ping);
		}
		// checks if ping isn't a bot
		else if (!message.mentions.users.first().bot) {
			const ew_user = new MessageEmbed()
				.setTitle('No humans!')
				.setDescription('Please only generate bot invites.');
			message.channel.send(ew_user);
		}


	} };
