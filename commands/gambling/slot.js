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
		const rekewords = ['rewards', 'reward', 'table'];
		const { randomRange, randomArray } = require('../../functions.js');
		const balanceSchema = require('../../schemas/balanceSchema');
		const data = await balanceSchema.findOne({ UserID: message.author.id });
		const bet = args[0];
		if (!bet) {message.channel.send('You gotta do a bet lol'); return;}
		if (rekewords.includes(bet)) {
			const embed = new MessageEmbed()
				.setTitle('slots rewards')
				.setDescription(':diamond_shape_with_a_dot_inside: :diamond_shape_with_a_dot_inside: :diamond_shape_with_a_dot_inside:: 200x bet.\n<a:CoinPixelsSpinning:839896513743290378> <a:CoinPixelsSpinning:839896513743290378> <a:CoinPixelsSpinning:839896513743290378>: 150x bet \n\
                :moneybag: :moneybag: :moneybag:: 100x bet\n:trophy: :trophy: :trophy::50x bet\n:money_mouth: :money_mouth: :money_mouth:: 25x bet\n:dollar: :dollar: :dollar:: 10x bet\n:diamond_shape_with_a_dot_inside: :diamond_shape_with_a_dot_inside:: 5x bet.\n\
                <a:CoinPixelsSpinning:839896513743290378> <a:CoinPixelsSpinning:839896513743290378>: 5x bet \n:moneybag: :moneybag:: 5x bet\n:dollar: :dollar:: 4x bet\n<:ye:825408089599639552> <:ye:825408089599639552>: 3x bet\n:neutral_face: :neutral_face:: 2x bet\n\
                :flushed: :flushed:: 1x bet');
			message.channel.send(embed);
			return;
		}
		if (bet < 50) {message.channel.send('You must bet over 50 coins!'); return;}
		if (bet.indexOf('.') > -1) {message.channel.send('No decimals!'); return;}
		if (bet > data.wallet) {message.channel.send('Dude, how stupid are you? You can\'t bet more than you have! \nEven with your gambling addiction that ain\'t possible lol.'); return;} if (isNaN(args[0])) {message.channel.send('No betting words bud!'); return;}
		if (isNaN(args[0])) {message.channel.send('Uh;.words in a slot machine? It\'ll break y\'know'); return;}
		if (bet > 200000) {message.channel.send('Yeah..a little too much bud, no more than 200,000 coins'); return;}
		let slotemote1 = [':moneybag:', ':trophy:', ':money_mouth:', ':money_with_wings:', ':diamond_shape_with_a_dot_inside:', ':dollar:', ':neutral_face:', ':flushed:', '<a:CoinPixelsSpinning:839896513743290378>', '<:ye:825408089599639552>'];
		let randomemote1 = (slotemote1[Math.floor(Math.random() * slotemote1.length)]);
		let slotemote2 = [':moneybag:', ':trophy:', ':money_mouth:', ':money_with_wings:', ':diamond_shape_with_a_dot_inside:', ':dollar:', ':neutral_face:', ':flushed:', '<a:CoinPixelsSpinning:839896513743290378>', '<:ye:825408089599639552>' ];
		let randomemote2 = (slotemote2[Math.floor(Math.random() * slotemote2.length)]);
		let slotemote3 = [':moneybag:', ':trophy:', ':money_mouth:', ':money_with_wings:', ':diamond_shape_with_a_dot_inside:', ':dollar:', ':neutral_face:', ':flushed:', '<a:CoinPixelsSpinning:839896513743290378>', '<:ye:825408089599639552>' ];
		let randomemote3 = (slotemote3[Math.floor(Math.random() * slotemote3.length)]);
		let winning;
		let multi;
		// ah yes, code mess
		switch (true) {
		case randomemote1 == ':diamond_shape_with_a_dot_inside:' && randomemote2 == ':diamond_shape_with_a_dot_inside:' && randomemote3 == ':diamond_shape_with_a_dot_inside:':
			multi = 200;
			winning = bet * multi;
			break;
		case randomemote1 == '<a:CoinPixelsSpinning:839896513743290378>' && randomemote2 == '<a:CoinPixelsSpinning:839896513743290378>' && randomemote3 == '<a:CoinPixelsSpinning:839896513743290378>':
			multi = 150;
			winning = bet * multi;
			break;
		case randomemote1 == ':moneybag:' && randomemote2 == ':moneybag:' && randomemote3 == ':moneybag:':
			multi = 100;
			winning = bet * multi;
			break;
		case randomemote1 == ':trophy:' && randomemote2 == ':trophy:' && randomemote3 == ':trophy:':
			multi = 50;
			winning = bet * multi;
			break;
		case randomemote1 == ':money_mouth:' && randomemote2 == ':money_mouth:' && randomemote3 == ':money_mouth:':
			multi = 25;
			winning = bet * multi;
			break;
		case randomemote1 == ':dollar:' && randomemote2 == ':dollar:' && randomemote3 == ':dollar:':
			multi = 10;
			winning = bet * multi;
			break;
		case randomemote1 == ':diamond_shape_with_a_dot_inside:' && randomemote2 == ':diamond_shape_with_a_dot_inside:' || randomemote1 == ':diamond_shape_with_a_dot_inside:' && randomemote3 == ':diamond_shape_with_a_dot_inside:' || randomemote2 == ':diamond_shape_with_a_dot_inside:' && randomemote3 == ':diamond_shape_with_a_dot_inside:':
			multi = 5;
			winning = bet * multi;
			break;
		case randomemote1 == '<a:CoinPixelsSpinning:839896513743290378>' && randomemote2 == '<a:CoinPixelsSpinning:839896513743290378>' || randomemote1 == '<a:CoinPixelsSpinning:839896513743290378>' && randomemote3 == '<a:CoinPixelsSpinning:839896513743290378>' || randomemote2 == '<a:CoinPixelsSpinning:839896513743290378>' && randomemote3 == '<a:CoinPixelsSpinning:839896513743290378>':
			multi = 5;
			winning = bet * multi;
			break;
		case randomemote1 == ':moneybag:' && randomemote2 == ':moneybag:' || randomemote1 == ':moneybag:' && randomemote3 == ':moneybag:' || randomemote2 == ':moneybag:' && randomemote3 == ':moneybag:':
			multi = 5;
			winning = bet * multi;
			break;
		case randomemote1 == ':dollar:' && randomemote2 == ':dollar:' || randomemote1 == ':dollar:' && randomemote3 == ':dollar:' || randomemote2 == ':dollar:' && randomemote3 == ':dollar:':
			multi = 4;
			winning = bet * multi;
			break;
		case randomemote1 == '<:ye:825408089599639552>' && randomemote2 == '<:ye:825408089599639552>' || randomemote1 == '<:ye:825408089599639552>' && randomemote3 == '<:ye:825408089599639552>' || randomemote2 == '<:ye:825408089599639552>' && randomemote3 == '<:ye:825408089599639552>':
			multi = 3;
			winning = bet * multi;
			break;
		case randomemote1 == ':neutral_face:' && randomemote2 == ':neutral_face:' || randomemote1 == ':neutral_face:' && randomemote3 == ':neutral_face:' || randomemote2 == ':neutral_face:' && randomemote3 == ':neutral_face:':
			multi = 2;
			winning = bet * multi;
			break;
		case randomemote1 == ':flushed:' && randomemote2 == ':flushed:' || randomemote1 == ':flushed:' && randomemote3 == ':flushed:' || randomemote2 == ':flushed:' && randomemote3 == ':flushed:':
			multi = 1;
			winning = bet * multi;

			break;

		default:
			let loseembed = new MessageEmbed()
				.setTitle('lost!')
				.setDescription(`[${randomemote1 + randomemote2 + randomemote3}]\n\nAmount lost: ${bet} coins`)
				.setColor('#FF0000');
			message.channel.send(loseembed);
			const query = { UserID: message.author.id };
			const update = { $inc: { wallet: -bet } };
			const options = { 'new': true, 'useFindAndModify' : false };
			balanceSchema.findOneAndUpdate(query, update, options, function(err, doc) {});
			data.save();
			// after code
			if (cooldowndata.OwnerCooldown == 'false') {
				cooldowndata.slot = 0;
				cooldowndata.save();
			}
			else {
				cooldowndata.slot = Date.now();
				cooldowndata.save();
			}
			//
			return;
			break;
		}
		let winembed = new MessageEmbed()
			.setTitle('won!')
			.setDescription(`[${randomemote1 + randomemote2 + randomemote3}]\n\nMulti: ${multi}x\nAmount won: ${winning} coins`)
			.setColor('#75FF33');
		message.channel.send(winembed);
		const query = { UserID: message.author.id };
		const update = { $inc: { wallet: winning } };
		const options = { 'new': true, 'useFindAndModify' : false };
		balanceSchema.findOneAndUpdate(query, update, options, function(err, doc) {});
		data.save();
		// after code
		if (cooldowndata.OwnerCooldown == 'false') {
			cooldowndata.slot = 0;
			cooldowndata.save();
		}
		else {
			cooldowndata.slot = Date.now();
			cooldowndata.save();
		}
		//
	} };