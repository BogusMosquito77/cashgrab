/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'work',
	aliases:['job'],
	run: async (client, message, args, prefix) => {
		// mongodb stuff
		const { addwallet } = require('../../functions.js');
		const { argsfunction, work } = require('../../work-logic/general-logic.js');
		const jobs = ['gar', 'fac', 'dri', 'fas', 'coo', 'cas', 'bus', 'dev'];
		/* gar = garbage man, fac = factory worker, dri = driver, fas = fast food worker,
		coo = cook, cas = cashier, bus = bus driver, dev = developer */
		const keywords = ['list', 'table', 'resumes'];
		const balanceSchema = require('../../schemas/balanceSchema');
		const balancedata = await balanceSchema.findOne({ UserID: message.author.id });
		const jobSchema = require('../../schemas/jobSchema');
		const jobdata = await jobSchema.findOne({ UserID: message.author.id });
		if (!jobdata && !args[0] || jobdata.job == 'unemployed' && !args[0]) {
			if (!jobdata) {
				const newjobdata = new jobSchema({
					job: 'unemployed',
					salary: '0',
					hours: 0,
					cooldown: 0,
					newjobcooldown: 0,
					UserID: message.author.id,
				});
				newjobdata.save();
			}
			return message.channel.send('You are unemployed! Find a job first!');
		}
		if (args[0]) return argsfunction(message, args, jobdata);
		work(message, args, jobdata);
	} };