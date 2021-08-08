const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'settings',
	aliases: ['options'],
	run: async (client, message, args) => {
		// mongodb stuff
		const settingsSchema = require('../../schemas/settingsSchema');
		const settings = await settingsSchema.findOne({ UserID: message.author.id });
		const totaliases = ['crypto'];
		const normalaliases = ['normal', 'infinite', 'regular'];

		if (settings) {
			if (!args[0]) {
				const allsets = new MessageEmbed()
					.setTitle(`${message.author.username}'s settings`)
					.setDescription(`mode:**${settings.mode}**  (normal or crypto)\n***no other settings yet!***`);
				message.channel.send({ embeds: [allsets] });
			}
			else {
				switch (args[0]) {
				case 'mode':
					switch (true) {
					case normalaliases.includes(args[1]):
						settings.mode = 'normal';
						settings.save();
						message.channel.send('Updated your mode to normal!');
						break;

					case totaliases.includes(args[1]):
						settings.mode = 'crypto';
						settings.save();
						message.channel.send('Updated your mode to the crypto mode!');
						break;

					default:
						break;
					}

					break;
				default:
					break;
				}
			}
		}
		else if (!settings) {
			const newdata = new settingsSchema({
				mode: 'normal',
				UserID: message.author.id,
			});
			newdata.save();
			message.channel.send('so basically you\'ve come across a lazy dev, please run this command again');

			return;
		}

	} };