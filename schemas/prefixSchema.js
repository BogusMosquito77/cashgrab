const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	prefix: String,
	GuildID: String,
});


module.exports = mongoose.model('prefix', Schema);