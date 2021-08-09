/* eslint-disable no-case-declarations */
/* eslint-disable no-inline-comments */
/* eslint-disable no-undef */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */

module.exports = {
	argsfunction: function argsfunction(message, args, jobdata) {
		const { Client, Collection, Message, MessageEmbed, Intents } = require('discord.js');
		const salary = require('../work-json/salary.json');
		const fullname = require('../work-json/full-names.json');
		const jobs = ['gar', 'fac', 'dri', 'fas', 'coo', 'cas', 'bus', 'dev'];
		const workargs = args[0].substring(0, 3).toLowerCase();
		/* gar = garbage man, fac = factory worker, dri = driver, fas = fast food worker,
		coo = cook, cas = cashier, bus = bus driver, dev = developer */
		const keywords = ['list', 'table', 'resumes'];
		if (!jobs.includes(args[0].substring(0, 3).toLowerCase()) && !keywords.includes(args[0].toLowerCase())) {
			return message.channel.send('that is not a valid job!');
		}
		if (keywords.includes(args[0].toLowerCase())) {
			const listembed = new MessageEmbed()
				.setTitle('current work list:')
				.setFooter(`current job: ${fullname[jobdata.job]}. current salary: ${jobdata.salary.toLocaleString('en-US')} coins`)
				.setColor('1207d6');
			return message.channel.send({ embeds: [listembed] });
		}
		if (args[0].substring(0, 3).toLowerCase() == jobdata.job) return message.channel.send('You went to your boss and asked to apply again, they said yes.. ofcourse they did');
		jobdata.job = args[0].substring(0, 3).toLowerCase();
		jobdata.salary = Number(salary[workargs]);
		jobdata.save();
		return message.channel.send(`You applied for ${fullname[workargs]}, and got accepted! Now you earn ${salary[workargs]} coins per hour of work!`);

	},
	work: function work(message, args, jobdata) {
		const { Client, Collection, Message, MessageEmbed, Intents } = require('discord.js');
		const salary = require('../work-json/salary.json');
		const fullname = require('../work-json/full-names.json');
		const jobs = ['gar', 'fac', 'dri', 'fas', 'coo', 'cas', 'bus', 'dev'];
		// without 1 is the one to NOT display, it does not have invis spaces
		const { randomArray } = require ('../functions');
		const minigamearray = ['repeatsentence.json', 'repeatsentence.json'];
		let minigame = randomArray(minigamearray);
		switch (minigame) {
		case 'repeatsentence.json':
			minigame = require ('../work-json/repeatsentence.json');
			const sentence = randomArray(minigame[jobdata.job]);
			message.channel.send(sentence);
			break;

		default:
			break;
		}
	},

};
