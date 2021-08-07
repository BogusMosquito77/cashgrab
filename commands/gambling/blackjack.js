/* eslint-disable no-case-declarations */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable max-statements-per-line */
/* eslint-disable no-empty-function */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'slot',
	aliases:['slots'],
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
		const timeout = 15 * 1000 ; // 1 minute  in milliseconds, change to the desired cooldown time, in milliseconds
		const cooldown = await cooldowndata.slot;
		if (cooldown && timeout - (Date.now() - cooldown) > 0) {
			const time = ms(timeout - (Date.now() - cooldown));
			message.channel.send(`slow it down, wait **${time}** before running this command again`);
			cooldowndata.save();
			return;
		}
		//
		// rest of code
		const { randomRange, randomArray } = require('../../random.js');
		const balanceSchema = require('../../schemas/balanceSchema');
		const data = await balanceSchema.findOne({ UserID: message.author.id });
		const bet = args[0];
		if (!bet) {message.channel.send('You gotta do a bet lol'); return;}
		if (bet < 50) {message.channel.send('You must bet over 50 coins!'); return;}
		if (bet.indexOf('.') > -1) {message.channel.send('No decimals!'); return;}
		if (bet > data.wallet) {message.channel.send('Dude, how stupid are you? You can\'t bet more than you have! \nEven with your gambling addiction that ain\'t possible lol.'); return;} if (isNaN(args[0])) {message.channel.send('No betting words bud!'); return;}
		if (isNaN(args[0])) {message.channel.send('Mate, you can\'t blackjack with words y\'know'); return;}
		if (bet > 200000) {message.channel.send('Yeah..a little too much bud, no more than 200,000 coins'); return;}
		const user = message.mentions.members.first() || message.author;
		let userid;
		if (args[1] != message.mentions.members.first() && args[1]) {userid = args[1];}
		else {userid = user.id;}
		let botbj;
		let userbj;
		// uhh, sorry dank
		const faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
		const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
	} };