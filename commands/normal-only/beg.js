/* eslint-disable no-unreachable */
/* eslint-disable no-empty-function */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-spacing */
/* eslint-disable no-var */
/* eslint-disable max-statements-per-line */
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'beg',
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
		const cooldown = await cooldowndata.beg;
		if (cooldown && timeout - (Date.now() - cooldown) > 0) {
			const time = ms(timeout - (Date.now() - cooldown));
			message.channel.send(`slow it down, wait **${time}** before running this command again`);
			cooldowndata.save();
			return;
		}
		//
		// rest of code
		const { randomRange } = require('../../functions.js');
		const balanceSchema = require('../../schemas/balanceSchema');
		const data = await balanceSchema.findOne({ UserID: message.author.id });
		let amount;
		const variablenameidk = randomRange(0,100);
		switch (true) {
		case variablenameidk < 20:
			message.channel.send('No coins for ya!');
			return;
			break;
		case variablenameidk > 20 && variablenameidk < 85:
			amount = randomRange(100,700);
			break;
		case variablenameidk > 85:
			amount = randomRange(2000,4000);
			break;

		default:
			break;
		}
		const query = { UserID: message.author.id };
		const update = { $inc: { wallet: amount } };
		const options = { 'new': true, 'useFindAndModify' : false };
		balanceSchema.findOneAndUpdate(query, update, options, function(err, doc) {});
		data.save();
		const yes = new MessageEmbed()
			.setTitle('Succesful!')
			.setDescription(`${message.author} got ${amount} coins while begging!`);
		message.channel.send(yes);
		// after code
		if (cooldowndata.OwnerCooldown == 'false') {
			cooldowndata.beg = 0;
			cooldowndata.save();
		}
		else {
			cooldowndata.beg = Date.now();
			cooldowndata.save();
		}
		//

	} };