/* eslint-disable no-inner-declarations */
/* eslint-disable no-case-declarations */
/* eslint-disable no-inline-comments */
/* eslint-disable no-undef */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */

module.exports = {
	argsfunction: function argsfunction(message, args, jobdata, cooldowndata) {
		const { Client, Collection, Message, MessageEmbed, Intents } = require('discord.js');
		const salary = require('../work-json/salary.json');
		const fullname = require('../work-json/full-names.json');
		const jobs = ['gar', 'fac', 'dri', 'fas', 'coo', 'cas', 'bus', 'dev'];
		const workargs = args[0].substring(0, 3).toLowerCase();
		/* gar = garbage man, fac = factory worker, dri = driver, fas = fast food worker,
		coo = cook, cas = cashier, bus = bus driver, dev = developer */
		const listkeywords = ['list', 'table', 'resumes'];
		const infokeywords = ['view', 'info', 'hours'];
		const keywords = listkeywords && infokeywords;
		const requiredhours = require('../work-json/requiredhours.json');
		function worklist() {
			const hours = jobdata.hours;
			/* gar = garbage man, fac = factory worker, dri = driver, fas = fast food worker,
			coo = cook, cas = cashier, bus = bus driver, dev = developer */
			function jobunlock(job) {
				if (hours < requiredhours[job]) {return `:red_square: ${fullname[job]}`;}
				else {return `:green_square: ${fullname[job]}`;}

			}
			// embed code will be better dw
			const listembed = new MessageEmbed()
				.setTitle('current work list:')
				.setDescription(`${jobunlock('gar')} \n${jobunlock('fac')} \n${jobunlock('dri')} \n${jobunlock('fas')} \n${jobunlock('coo')} \n${jobunlock('cas')} \n${jobunlock('bus')} \n${jobunlock('dev')} \n`)
				.setFooter(`current job: ${fullname[jobdata.job]}. current salary: ${jobdata.salary.toLocaleString('en-US')} coins`)
				.setColor('1207d6');
			return message.channel.send({ embeds: [listembed] });
		}

		if (!jobs.includes(args[0].substring(0, 3).toLowerCase()) && !infokeywords.includes(args[0].toLowerCase()) && !listkeywords.includes(args[0].toLowerCase())) {
			return message.channel.send('that is not a valid job!');
		}
		if (listkeywords.includes(args[0].toLowerCase())) {
			return worklist();
		}
		if (args[0].substring(0, 3).toLowerCase() == jobdata.job) return message.channel.send('You went to your boss and asked to apply again, they said yes.. ofcourse they did');
		if (jobdata.hours < requiredhours[workargs]) {return message.channel.send(`You haven't unlocked ${fullname[workargs]}! \n \nhours worked: ${jobdata.hours}\nhours needed: ${requiredhours[workargs]}\nhours left: ${requiredhours[workargs] - jobdata.hours}`);}
		// cooldown
		const ms = require('ms');

		// eslint-disable-next-line no-inline-comments
		const timeout = 24 * 1000 * 60 * 60 ; // 10 seconds  in milliseconds, change to the desired cooldown time, in milliseconds
		cooldown = jobdata.newjobcooldown;
		if (cooldown && timeout - (Date.now() - cooldown) > 0) {
			const time = ms(timeout - (Date.now() - cooldown));
			message.channel.send(`You just got a job! calm down, wait **${time}** before applying again!`);
			jobdata.save();
			return;
		}
		jobdata.job = args[0].substring(0, 3).toLowerCase();
		jobdata.salary = Number(salary[workargs]);
		// after code
		if (cooldowndata.OwnerCooldown == 'false') {
			jobdata.newjobcooldown = 0;
			jobdata.save();
		}
		else {
			jobdata.newjobcooldown = Date.now();
			jobdata.save();
		}
		//
		return message.channel.send(`You applied for ${fullname[workargs]}, and got accepted! Now you earn ${salary[workargs]} coins per hour of work!`);

	},
	work: function work(message, args, jobdata, cooldowndata, balancedata) {
		// cooldown
		const ms = require('ms');

		// eslint-disable-next-line no-inline-comments
		const timeout = 60 * 1000 * 60 ; // 10 seconds  in milliseconds, change to the desired cooldown time, in milliseconds
		cooldown = jobdata.cooldown;
		if (cooldown && timeout - (Date.now() - cooldown) > 0) {
			const time = ms(timeout - (Date.now() - cooldown));
			message.channel.send(`Dude, your boss doesn't pay you for overtime, wait **${time}** before working again please`);
			jobdata.save();
			return;
		}
		const { Client, Collection, Message, MessageEmbed, Intents } = require('discord.js');
		const salary = require('../work-json/salary.json');
		const fullname = require('../work-json/full-names.json');
		const jobs = ['gar', 'fac', 'dri', 'fas', 'coo', 'cas', 'bus', 'dev'];
		// without fake is the one to NOT display, it does not have invis spaces
		const { randomArray, addwallet } = require ('../functions');
		const minigamearray = ['repeatsentence.json', 'repeatsentence.json'];
		let minigame = randomArray(minigamearray);
		function addhour() {
			const jobSchema = require('../schemas/jobSchema');
			const query = { UserID: message.author.id };
			const update = { $inc: { hours: 1 } };
			const options = { 'new': true, 'useFindAndModify' : false };
			return jobSchema.findOneAndUpdate(query, update, options, function(err, doc) {});
		}
		function addmoney() {
			const jobSchema1 = require('../schemas/jobSchema');
			const query1 = { UserID: message.author.id };
			const update1 = { $inc: { money: jobdata.salary } };
			const options1 = { 'new': true, 'useFindAndModify' : false };
			addwallet(Number(jobdata.salary), message.author.id);
			balancedata.save();
			return jobSchema1.findOneAndUpdate(query1, update1, options1, function(err, doc) {});
		}
		switch (minigame) {
		case 'repeatsentence.json':
			minigame = require ('../work-json/repeatsentence.json');
			const sentencenumber = Math.floor(Math.random() * minigame[jobdata.job].length);
			const sentence = minigame[jobdata.job][sentencenumber];
			const sentencefake = minigame[jobdata.job + 'fake'][sentencenumber];
			message.channel.send(`**repeat the sentence to earn money:**\n${sentencefake}`);
			addhour();
			const filter = msg => msg.author.id == message.author.id;
			const options = {
				max: 1,
				time: 20 * 1000,
				errors: ['time'],
			};
			addhour();
			async function collector() {
				message.channel.awaitMessages({ filter, max: 1,
					time: 20 * 1000,
					errors: ['time'] })
					.then(collected => {
						const answer = collected.first().content.toLowerCase();
						if (answer != sentence) {
							const failembed = new MessageEmbed()
								.setTitle(`failed to work as ${fullname[jobdata.job]}`)
								.setDescription(`the correct answer was: ${sentencefake}`)
								.setColor('#FF0000');
							message.channel.send({ embeds: [failembed] });
							// after code
							if (cooldowndata.OwnerCooldown == 'false') {
								jobdata.cooldown = 0;
								jobdata.save();
							}
							else {
								jobdata.cooldown = Date.now();
								jobdata.save();
							}
							//
							return;
						}
						else {message.channel.send(`boss: **good job, i'll give you ${jobdata.salary} for an hour of work!**`);}
						addmoney();
						addhour();

					})
					.catch(collected => {
						message.channel.send('uhhh... yeah your boss doesn\'t really like that you didn\'t work');
					});
			}
			collector();
			break;

		default:
			break;
		}
		// after code
		if (cooldowndata.OwnerCooldown == 'false') {
			jobdata.cooldown = 0;
			jobdata.save();
		}
		else {
			jobdata.cooldown = Date.now();
			jobdata.save();
		}
		//
	},

};