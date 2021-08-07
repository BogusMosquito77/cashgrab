const { MessageEmbed, Util } = require('discord.js');

module.exports = {
	name: 'howgay',
	aliases: ['gay'],
	run: async (client, message, args) => {
		const cooldownSchema = require('../../schemas/cooldownSchema');
		const cooldowndata = await cooldownSchema.findOne({ UserID: message.author.id });
		// dis just if there is no cooldowndata for anyone
		if (!cooldowndata) {
			const newdata = new cooldownSchema({
				howgay: 0,
				beg: 0,
				bet: 0,
				slot: 0,
				blackjack: 0,
				OwnerCooldown: true,
				UserID: message.author.id,
			});
			newdata.save();
			message.channel.send('Please run this command again, i have put you in our database.');
			return;
		}
		//
		// cooldown
		const ms = require('ms');

		// eslint-disable-next-line no-inline-comments
		const timeout = 5 * 1000 ; // 10 seconds  in milliseconds, change to the desired cooldown time, in milliseconds
		const cooldown = await cooldowndata.howgay;
		if (cooldown && timeout - (Date.now() - cooldown) > 0) {
			const time = ms(timeout - (Date.now() - cooldown));
			message.channel.send(`slow it down, wait **${time}** before running this command again`);
			cooldowndata.save();
			return;
		}
		//
		// rest of code
		const { randomRange } = require('../../functions.js');
		const howgay = randomRange(0, 100);

		if (message.mentions.members.first()) {
			const user = message.mentions.users.first().username;
			const pingbed = new MessageEmbed()
				.setTitle(`How gay is ${user}?`)
				.setDescription(`${user} is ${howgay}% gay`)
				.setColor('RANDOM');
			message.channel.send(pingbed);
		}
		else if (args[0]) {
			const user = Util.cleanContent(args.join(' '), message);
			const argsbed = new MessageEmbed()
				.setTitle(`How gay is ${user}?`)
				.setDescription(`${user} is ${howgay}% gay`)
				.setColor('RANDOM');
			message.channel.send(argsbed);

		}
		else {
			const user = message.author.username;
			const userbed = new MessageEmbed()
				.setTitle(`How gay is ${user}?`)
				.setDescription(`${user} is ${howgay}% gay`)
				.setColor('RANDOM');
			message.channel.send(userbed);
		}
		// after code
		cooldowndata.howgay = Date.now();
		cooldowndata.save();
		//
	} };