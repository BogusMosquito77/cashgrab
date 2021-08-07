const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'help',
	aliases: ['hyperhelp'],
	run: async (client, message, args) => {
		const settingsSchema = require('../../schemas/settingsSchema');
		const settings = await settingsSchema.findOne({ UserID: message.author.id });
		const correctargs = ['currency', 'fun'];
		if (!args[0]) {
			const helpembed = new MessageEmbed()
				.setAuthor('CashGrab help', 'https://cdn.discordapp.com/avatars/818046402193653781/a1e90da5bd34634e9e32782a575eb3a8.png?size=128')
				.addField('<a:CoinPixelsSpinning:839896513743290378>currency:', '*shows the commands that only apply to currency \n (and your mode)*', true)
				.addField('<a:birbdance:839897463053746186>fun:', '*all fun commands!*', true)
				.setFooter('do &help *category* to see the correct category')
				.setColor('1207d6');
			message.channel.send(helpembed);
		}

		else if (!correctargs.includes(args[0])) {
			const helpembed = new MessageEmbed()
				.setAuthor('CashGrab help', 'https://cdn.discordapp.com/avatars/818046402193653781/a1e90da5bd34634e9e32782a575eb3a8.png?size=128')
				.addField('<a:CoinPixelsSpinning:839896513743290378>currency:', '*shows the commands that only apply to currency (and your mode)*', true)
				.addField('<a:birbdance:839897463053746186>fun:', '*all fun commands!*', true)
				.setFooter('do &help *category* to see the correct category (you probably made a typo)')
				.setColor('1207d6');
			message.channel.send(helpembed);
		}
		else {
			switch (args[0].toLowerCase()) {
			case 'currency':
				if (settings.mode == 'normal') {
					const currencyhelpembed = new MessageEmbed()
						.setAuthor('currency help', 'https://cdn.discordapp.com/avatars/818046402193653781/a1e90da5bd34634e9e32782a575eb3a8.png?size=128')
						.addField('balance:', '*shows your balance*', true)
						.addField('deposit:', '*deposits money to your bank*', true)
						.addField('withdraw:', '*withdraws money to your bank*', true)
						.setFooter('your mode is "normal"')
						.setColor('1207d6');
					message.channel.send(currencyhelpembed);
				}
				else {
					const currencyhelpembed = new MessageEmbed()
						.setAuthor('currency help', 'https://cdn.discordapp.com/avatars/818046402193653781/a1e90da5bd34634e9e32782a575eb3a8.png?size=128')
						.addField('balance:', '*shows your balance*', true)
						.addField('deposit:', '*deposits money to your bank*', true)
						.addField('withdraw:', '*withdraws money to your bank*', true)
						.setFooter('your mode is "crypto"')
						.setColor('1207d6');
					message.channel.send(currencyhelpembed);
				}
				break;
			case 'fun':
				// eslint-disable-next-line no-case-declarations
				const funhelpembed = new MessageEmbed()
					.setAuthor('fun help', 'https://cdn.discordapp.com/avatars/818046402193653781/a1e90da5bd34634e9e32782a575eb3a8.png?size=128')
					.addField('howgay:', '*shows how gay someone is in % (only for fun, no real values)*', true)
					.setColor('1207d6');
				message.channel.send(funhelpembed);
				break;
			default:
				break;
			}
		}
	} };