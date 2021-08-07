const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	job: String,
	UserID: String,
});

module.exports = mongoose.model('job', Schema);