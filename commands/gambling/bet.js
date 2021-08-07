/* eslint-disable prefer-const */
/* eslint-disable max-statements-per-line */
/* eslint-disable no-empty-function */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'bet',
	aliases:['diceroll'],
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
		const timeout = 60 * 1000 ; // 1 minute  in milliseconds, change to the desired cooldown time, in milliseconds
		const cooldown = await cooldowndata.bet;
		if (cooldown && timeout - (Date.now() - cooldown) > 0) {
			const time = ms(timeout - (Date.now() - cooldown));
			message.channel.send(`slow it down, wait **${time}** before running this command again`);
			cooldowndata.save();
			return;
		}
		//
		// rest of code
		const { randomRange } = require('../../random.js');
		const balanceSchema = require('../../schemas/balanceSchema');
		const data = await balanceSchema.findOne({ UserID: message.author.id });
		const botroll = randomRange(1, 12);
		const userroll = randomRange(1, 12);
		let bet = args[0];

		if (!bet) {message.channel.send('You gotta do a bet lol'); return;}
		if (bet < 50) {message.channel.send('You must bet over 50 coins!'); return;}
		if (bet.indexOf('.') > -1) {message.channel.send('No decimals!'); return;}
		if (bet > data.wallet) {message.channel.send('Dude, how stupid are you? You can\'t bet more than you have! \nEven with your gambling addiction that ain\'t possible lol.'); return;}
		if (bet > 200000) {message.channel.send('Yeah..a little too much bud, no more than 200,000 coins'); return;}
		if (isNaN(args[0])) {message.channel.send('No betting words bud!'); return;}
		let winningpercent;
		let winning;
		if (botroll > userroll) {
			let loseembed = new MessageEmbed()
				.setTitle('lost!')
				.setDescription(`Amount lost: ${bet} coins\n\n${message.author.username} rolled: ${userroll}\n cashgrab rolled: ${botroll}`)
				.setColor('#FF0000');
			message.channel.send(loseembed);
			const query = { UserID: message.author.id };
			const update = { $inc: { wallet: -bet } };
			const options = { 'new': true, 'useFindAndModify' : false };
			balanceSchema.findOneAndUpdate(query, update, options, function(err, doc) {});
			data.save();
			return;
		}
		if (botroll == userroll) {
			let tieembed = new MessageEmbed()
				.setTitle('tied!')
				.setDescription(`You tied and still have ${bet} coins!\n\n${message.author.username} rolled: ${userroll}\n cashgrab rolled: ${botroll}`)
				.setColor('#FFBD33');
			message.channel.send(tieembed);
			return;
		}
		const variablenameidk = randomRange(0, 100);
		switch (true) {

		case variablenameidk <= 90:
			winningpercent = randomRange(40, 150);
			break;
		case variablenameidk > 90:
			winningpercent = randomRange(200, 400);
			break;

		default:
			break;
		}
		winning = (winningpercent / 100) * bet;
		const winembed = new MessageEmbed()
			.setTitle('won!')
			.setDescription(`Amount won: ${Math.floor(winning)} coins\n\nPercent won: ${winningpercent}\n${message.author.username} rolled: ${userroll}\n cashgrab rolled: ${botroll}`)
			.setColor('#75FF33');
		message.channel.send(winembed);
		const query = { UserID: message.author.id };
		const update = { $inc: { wallet: Math.floor(winning) } };
		const options = { 'new': true, 'useFindAndModify' : false };
		balanceSchema.findOneAndUpdate(query, update, options, function(err, doc) {});
		data.save();
		// after code
		if (cooldowndata.OwnerCooldown == 'false') {
			cooldowndata.bet = 0;
			cooldowndata.save();
		}
		else {
			cooldowndata.bet = Date.now();
			cooldowndata.save();
		}
		//
	} };