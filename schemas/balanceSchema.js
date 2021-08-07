const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	wallet: Number,
	bank: Number,
	total: Number,
	cwallet: Number,
	cbank: Number,
	ctotal: Number,
	UserID: String,
});

module.exports = mongoose.model('balance', Schema);