const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	job: String,
	salary: String,
	hours: Number,
	cooldown: Number,
	newjobcooldown: Number,
	UserID: String,
});

module.exports = mongoose.model('job', Schema);