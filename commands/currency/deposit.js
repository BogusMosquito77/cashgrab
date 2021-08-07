/* eslint-disable max-statements-per-line */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
/* eslint-disable no-empty-function */
/* eslint-disable no-var */
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'deposit',
	aliases:['dep'],
	run: async (client, message, args) => {
		// mongodb stuff
		const balanceSchema = require('../../schemas/balanceSchema');
		const data = await balanceSchema.findOne({ UserID: message.author.id });


		if (data) {
			var amount = args[0];
			const keywords = ['all', 'max', 'everything'];
			if (args[0] < 1 && !keywords.includes(args[0])) {message.channel.send('You can\'t deposit zero or negative coins, dumbass!'); return;}
			if (isNaN(args[0]) && !keywords.includes(args[0])) {message.channel.send('You can\'t deposit words, dumbass!'); return;}
			if (args[0].indexOf('.') > -1) {message.channel.send('No decimals!'); return;}
			if (keywords.includes(args[0])) {

				var query3 = { UserID: message.author.id };
				var update3 = { $inc: { bank: data.wallet } };
				var options3 = { 'new': true, 'useFindAndModify' : false };
				balanceSchema.findOneAndUpdate(query3, update3, options3, function(err, doc) {});
				var query2 = { UserID: message.author.id };
				var update2 = { $inc: { wallet: '-' + data.wallet } };
				var options2 = { 'new': true, 'useFindAndModify' : false };
				balanceSchema.findOneAndUpdate(query2, update2, options2, function(err, doc) {});
				data.save();
				const yes = new MessageEmbed()
					.setTitle('Succesful!')
					.setDescription('you deposited all your coins to your bank.')
					.setColor('1207d6');
				message.channel.send(yes);
			}
			else if (data.wallet < args[0]) {
				message.channel.send('Dude,you don\'t have enough money to deposit.');
			}
			else {


				var query = { UserID: message.author.id };
				var update = { $inc: { wallet: '-' + amount } };
				var options = { 'new': true, 'useFindAndModify' : false };
				balanceSchema.findOneAndUpdate(query, update, options, function(err, doc) {});
				var query1 = { UserID: message.author.id };
				var update1 = { $inc: { bank: amount } };
				var options1 = { 'new': true, 'useFindAndModify' : false };
				balanceSchema.findOneAndUpdate(query1, update1, options1, function(err, doc) {});
				data.save();
				const yes = new MessageEmbed()
					.setTitle('Succesful!')
					.setDescription(`you deposited ${args[0]} coins to your bank.`)
					.setColor('1207d6');
				message.channel.send(yes);
			}


		}
	} };