const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	job: String,
	salary: String,
	UserID: String,
});

module.exports = mongoose.model('job', Schema);