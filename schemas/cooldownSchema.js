const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	howgay: Number,
	beg: Number,
	bet: Number,
	slot: Number,
	blackjack: Number,
	OwnerCooldown: String,
	UserID: String,
});


module.exports = mongoose.model('cooldown', Schema);