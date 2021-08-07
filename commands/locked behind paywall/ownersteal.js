/* eslint-disable no-empty-function */
/* eslint-disable no-inline-comments */
/* eslint-disable no-unused-vars */
const { MessageEmbed, MessageMentions } = require('discord.js');
module.exports = {
	name: 'ownerrob',
	aliases:['ownerrob'],
	run: async (client, message, args) => {
		const me = ('647466955623759883');
		if (!me.includes(message.author.id)) {
			const ahhdamn = new MessageEmbed()
				.setTitle('You can\'t run this')
				.setDescription('You aren\'t the developer dude, sorry.');
			message.channel.send(ahhdamn);
			return;
		}
		else {
			// mongodb stuff
			const totalbalanceSchema = require('../../schemas/totalbalanceSchema');
			const balanceSchema = require('../../schemas/balanceSchema');
			const { randomRange } = require('../../random.js');
			const user = message.author;

			const totaldata = await totalbalanceSchema.findOne();
			const data = await balanceSchema.findOne({ UserID: message.author.id });
			let totbal;
			let wallet;

			if (data) {
				wallet = data.wallet;
				totbal = totaldata.balance;
				if (totbal < 100) {
					const rnot = new MessageEmbed()
						.setTitle('Not enough coins')
						.setDescription('there aren\'t enough coins left.');
					message.channel.send(rnot);
				}
				else {
					const amount = randomRange(1, totbal / 100 * 10); // https://www.codegrepper.com/code-examples/javascript/calculate+percentage+in+js


					const query = {};
					const update = { $inc: { balance: '-' + amount } };
					const options = { 'new': true, 'useFindAndModify' : false };
					totalbalanceSchema.findOneAndUpdate(query, update, options, function(err, doc) {});
					totaldata.save();
					const query1 = { UserID: message.author.id };
					const update1 = { $inc: { wallet: amount } };
					const options1 = { 'new': true, 'useFindAndModify' : false };
					balanceSchema.findOneAndUpdate(query1, update1, options1, function(err, doc) {});
					data.save();
					const yes = new MessageEmbed()
						.setTitle('Succesful!')
						.setDescription(`${user} Succesfully stole ${amount} coins from the total balance!!`);
					message.channel.send(yes);

				}
			}
			else {
				const newdata = new balanceSchema({
					wallet: 0,
					bank: 0,
					UserID: message.author.id,
				});
				newdata.save();
				message.channel.send('there is not enough balance to rob. there literally is none.');
			}
		}
	} };