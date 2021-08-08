/* eslint-disable max-statements-per-line */
/* eslint-disable no-constant-condition */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable no-redeclare */
const { MessageEmbed, MessageMentions } = require('discord.js');
module.exports = {
	name: 'withdraw',
	aliases:['with'],
	run: async (client, message, args) => {
		// mongodb stuff
		const balanceSchema = require('../../schemas/balanceSchema');
		const data = await balanceSchema.findOne({ UserID: message.author.id });


		if (data) {
			const settingsSchema = require('../../schemas/settingsSchema');
			const settings = await settingsSchema.findOne({ UserID: message.author.id });
			if (settings.mode == 'normal') {
				var amount = args[0];
				const keywords = ['all', 'max', 'everything'];
				if (args[0] < 1 && !keywords.includes(args[0])) {message.channel.send('You can\'t withdraw zero or negative coins, dumbass!'); return;}
				if (isNaN(args[0]) && !keywords.includes(args[0])) {message.channel.send('You can\'t withdraw words, dumbass!'); return;}
				if (args[0].indexOf('.') > -1) {message.channel.send('No decimals!'); return;}
				if (keywords.includes(args[0])) {

					var query3 = { UserID: message.author.id };
					var update3 = { $inc: { wallet: data.bank } };
					var options3 = { 'new': true, 'useFindAndModify' : false };
					balanceSchema.findOneAndUpdate(query3, update3, options3, function(err, doc) {});
					var query2 = { UserID: message.author.id };
					var update2 = { $inc: { bank: '-' + data.bank } };
					var options2 = { 'new': true, 'useFindAndModify' : false };
					balanceSchema.findOneAndUpdate(query2, update2, options2, function(err, doc) {});
					data.save();
					const yes = new MessageEmbed()
						.setTitle('Succesful!')
						.setDescription('you withdrawed all coins.')
						.setColor('1207d6');
					message.channel.send({ embeds: [yes] });
				}
				else if (data.bank < args[0]) {
					message.channel.send(`Dude, yes you,${message.author.username}, you don't have enough money to withdraw.`);
				}
				else {


					var query = { UserID: message.author.id };
					var update = { $inc: { bank: '-' + amount } };
					var options = { 'new': true, 'useFindAndModify' : false };
					balanceSchema.findOneAndUpdate(query, update, options, function(err, doc) {});
					var query1 = { UserID: message.author.id };
					var update1 = { $inc: { wallet: amount } };
					var options1 = { 'new': true, 'useFindAndModify' : false };
					balanceSchema.findOneAndUpdate(query1, update1, options1, function(err, doc) {});
					data.save();
					const yes = new MessageEmbed()
						.setTitle('Succesful!')
						.setDescription(`you withdrawed ${args[0]} coins.`)
						.setColor('1207d6');
					message.channel.send({ embeds: [yes] });
				}
			}
			else {
				var amount = args[0];
				if (amount == 'all' || 'max' || 'everything') {

					var query3 = { UserID: message.author.id };
					var update3 = { $inc: { cwallet: data.cbank } };
					var options3 = { 'new': true, 'useFindAndModify' : false };
					balanceSchema.findOneAndUpdate(query3, update3, options3, function(err, doc) {});
					var query2 = { UserID: message.author.id };
					var update2 = { $inc: { cbank: '-' + data.cbank } };
					var options2 = { 'new': true, 'useFindAndModify' : false };
					balanceSchema.findOneAndUpdate(query2, update2, options2, function(err, doc) {});
					data.save();
					const yes = new MessageEmbed()
						.setTitle('Succesful!')
						.setDescription('you withdrawed all coins.')
						.setColor('1207d6');
					message.channel.send({ embeds: [yes] });
				}
				else if (data.bank < args[0]) {
					message.channel.send(`Dude, yes you,${message.author.username}, you don't have enough money to withdraw.`);
				}
				else {


					var query = { UserID: message.author.id };
					var update = { $inc: { cbank: '-' + amount } };
					var options = { 'new': true, 'useFindAndModify' : false };
					balanceSchema.findOneAndUpdate(query, update, options, function(err, doc) {});
					var query1 = { UserID: message.author.id };
					var update1 = { $inc: { cwallet: amount } };
					var options1 = { 'new': true, 'useFindAndModify' : false };
					balanceSchema.findOneAndUpdate(query1, update1, options1, function(err, doc) {});
					data.save();
					const yes = new MessageEmbed()
						.setTitle('Succesful!')
						.setDescription(`you withdrawed ${args[0]} coins.`)
						.setColor('1207d6');
					message.channel.send({ embeds: [yes] });
				}
			}

		}
		else {
			const newdata = new balanceSchema({
				wallet: 0,
				bank: 0,
				total: 0,
				cwallet: 0,
				cbank: 0,
				ttotal: 0,
				UserID: message.author.id,
			});
			newdata.save();
			message.channel.send('you don\'t have enough coins to withdraw,please get some coins first.');

			return;

		}
	} };