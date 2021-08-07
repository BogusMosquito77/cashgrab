const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	mode: String,
	UserID: String,
});


module.exports = mongoose.model('settings', Schema);