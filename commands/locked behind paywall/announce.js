/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable no-redeclare */
/* eslint-disable no-inline-comments */
const { MessageEmbed, DiscordAPIError } = require('discord.js');
module.exports = {
	name: 'announce',
	aliases: ['announcement'],
	run: async (client, message, args, prefix) => {
		const filter = msg => msg.author.id == message.author.id;
		const options = {
			max: 1,
			time: 10 * 1000 * 60,
		};
		const yesses = ['y', 'yes', 'ye', 'sure'];

		if (!message.member.hasPermission('MANAGE_GUILD' || 'ADMINISTRATOR')) {
			const fourthembed = new MessageEmbed()
				.setTitle('**__Announcer: Error__**')
				.setDescription('You don\'t have enough perms to perform this action')
				.setColor('RANDOM');
			message.channel.send(fourthembed);
		}
		else {
			const firstembed = new MessageEmbed()
				.setTitle('**__Announcer__**')
				.setDescription('Please give the title to your announcement. \n You have 10 minutes to do so. \n **__Type cancel to cancel this process__**')
				.setColor('RANDOM');
			message.channel.send(firstembed);
			// message collector
			const collector = await message.channel.awaitMessages(filter, options);
			const answer = collector.first().content.toLowerCase();
			const ttfield = collector.first().content;
			if (answer == 'cancel') {
				const thirdembed = new MessageEmbed() // i know it says third but it was third when i was creating okeh
					.setTitle('**__Announcer: Cancelled!__**')
					.setDescription('I cancelled the process!')
					.setColor('RANDOM');
				message.channel.send(thirdembed);
				return;
			}
			else {
				var title = (ttfield);
				const secondembed = new MessageEmbed()
					.setTitle('**__Announcer: Title set!__**')
					.setDescription(`I succesfully set the title to "${title}"!`)
					.setColor('RANDOM');
				message.channel.send(secondembed);
			}
			await new Promise(r => setTimeout(r, 500));
			const fifthembed = new MessageEmbed()
				.setTitle('**__Announcer__**')
				.setDescription('Please give your announcement description. \n You have 10 minutes to do so. \n **__Type cancel to cancel this process__**')
				.setColor('RANDOM');
			message.channel.send(fifthembed);
			// collectors
			const collector1 = await message.channel.awaitMessages(filter, options);
			const answer1 = collector1.first().content.toLowerCase();
			const dsfield = collector1.first().content;
			if (answer1 == 'cancel') {
				const thirdembed = new MessageEmbed() // i know it says third but it was third when i was creating okeh
					.setTitle('**__Announcer: Cancelled!__**')
					.setDescription('I cancelled the process!')
					.setColor('RANDOM');
				message.channel.send(thirdembed);
				return;
			}
			else {
				var announcement = (dsfield);
				const secondembed = new MessageEmbed()
					.setTitle('**__Announcer: Announcement description set!__**')
					.setDescription(`I succesfully set the announcement description to "${announcement}"!`)
					.setColor('RANDOM');
				message.channel.send(secondembed);
			}
			await new Promise(r => setTimeout(r, 500));
			const coloraskemb = new MessageEmbed()
				.setTitle('**__Announcer: Do you wish for a custom color?!__**')
				.setDescription('Please say y(es) or n(o) (you can say yes or no too). \n You have 10 minutes to do so. \n **__Type cancel to cancel this process__**')
				.setColor('RANDOM');
			message.channel.send(coloraskemb);
			// collectors
			const collector3 = await message.channel.awaitMessages(filter, options);
			const answer3 = collector3.first().content.toLowerCase();
			if (answer3 == 'cancel') {
				const thirdembed = new MessageEmbed() // i know it says third but it was third when i was creating okeh
					.setTitle('**__Announcer: Cancelled!__**')
					.setDescription('I cancelled the process!')
					.setColor('RANDOM');
				message.channel.send(thirdembed);
				return;
			}
			if (yesses.includes(answer3)) {
				const coloryee = new MessageEmbed()
					.setTitle('**__Announcer: Color selector!__**')
					.setDescription('please choose your co:lor: \n ***red, green, blue, black,orange ,pink, yellow *** [or a custom: go to the site,choose color, copy hex code (without #)](https://htmlcolorcodes.com/color-picker/)\n You have 10 minutes to do so. \n **__type cancel to cancel this process__** ')
					.setColor('RANDOM');
				message.channel.send(coloryee);
				// collectors
				const collector4 = await message.channel.awaitMessages(filter, options);
				const answer4 = collector4.first().content.toLowerCase();
				if (answer4 == 'cancel') {
					const thirdembed = new MessageEmbed() // i know it says third but it was third when i was creating okeh
						.setTitle('**__Announcer: Cancelled!__**')
						.setDescription('I cancelled the process!')
						.setColor('RANDOM');
					message.channel.send(thirdembed);
					return;
				}
				else if (answer4 == 'red') {
					var color = '#FF0000';
					const colorredembed = new MessageEmbed()
						.setTitle('**__Announcer: successful!__**')
						.setDescription('I set the color to red!')
						.setColor('#FF0000');
					message.channel.send(colorredembed);
				}
				else if (answer4 == 'green') {
					var color = '#00FF00';
					const colorgreenembed = new MessageEmbed()
						.setTitle('**__Announcer: successful!__**')
						.setDescription('I set the color to green!')
						.setColor('#00FF00');
					message.channel.send(colorgreenembed);
				}
				else if (answer4 == 'blue') {
					var color = '#0000FF';
					const colorblueembed = new MessageEmbed()
						.setTitle('**__Announcer: successful!__**')
						.setDescription('I set the color to blue!')
						.setColor('#0000FF');
					message.channel.send(colorblueembed);
				}
				else if (answer4 == 'black') {
					var color = '#000000';
					const colorblackembed = new MessageEmbed()
						.setTitle('**__Announcer: successful!__**')
						.setDescription('I set the color to black!')
						.setColor('#000000');
					message.channel.send(colorblackembed);
				}
				else if (answer4 == 'orange') {
					var color = '#FFA500';
					const colororangeembed = new MessageEmbed()
						.setTitle('**__Announcer: successful!__**')
						.setDescription('I set the color to orange!')
						.setColor('#FFA500');
					message.channel.send(colororangeembed);
				}
				else if (answer4 == 'pink') {
					var color = '#FF00FF';
					const colorpinkembed = new MessageEmbed()
						.setTitle('**__Announcer: successful!__**')
						.setDescription('I set the color to pink!')
						.setColor('#FF00FF');
					message.channel.send(colorpinkembed);
				}
				else if (answer4 == 'yellow') {
					var color = '#FFFF00';
					const coloryellowembed = new MessageEmbed()
						.setTitle('**__Announcer: successful!__**')
						.setDescription('I set the color to yellow!')
						.setColor('#FFFF00');
					message.channel.send(coloryellowembed);
				}
				else {
					var color = `#${answer4}`;
					const othercolorembed = new MessageEmbed()
						.setTitle('**__Announcer: successful!__**')
						.setDescription('I set the color!')
						.setColor(`#${answer4}`);
					message.channel.send(othercolorembed);
				}
			}
			else {var color = 'RANDOM';}
			await new Promise(r => setTimeout(r, 500));
			const sixthembed = new MessageEmbed()
				.setTitle('**__Announcer__**')
				.setDescription('Please mention the channel (#channelname). \n You have 10 minutes to do so. \n **__Type cancel to cancel this process__**')
				.setColor('RANDOM');
			message.channel.send(sixthembed);

			// collectors
			const collector2 = await message.channel.awaitMessages(filter, options);
			const answer2 = collector2.first().content.toLowerCase();
			if (answer2 == 'cancel') {
				const thirdembed = new MessageEmbed() // i know it says third but it was third when i was creating okeh
					.setTitle('**__Announcer: Cancelled!__**')
					.setDescription('I cancelled the process!')
					.setColor('RANDOM');
				message.channel.send(thirdembed);
				return;
			}
			else {
				var channel = (answer2);


				const secondembed = new MessageEmbed()
					.setTitle('**__Announcer: Announcement set!__**')
					.setDescription(`I succesfully set the channel to "${channel}"!`)
					.setColor('RANDOM');
				message.channel.send(secondembed);
			}


			await new Promise(r => setTimeout(r, 700));

			if (yesses.includes(answer3)) {
				message.channel.bulkDelete(15);
			}
			else { message.channel.bulkDelete(12);}

			// notfinal embed
			const channelsend = client.channels.cache.get(answer2.replace(/\D/g, ''),
			);
			const notfinalembed = new MessageEmbed()
				.setTitle(title)
				.setDescription(announcement)
				.setColor(color);
			channelsend.send(notfinalembed);
			// finalembed
			const finalembed = new MessageEmbed()
				.setTitle('**__Announcer: Finished!__**')
				.setDescription(`Go check your announcement out in ${channel}`)
				.setColor(color);
			message.channel.send(finalembed);

		}
	} };