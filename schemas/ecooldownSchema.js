const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	cooldown: Number,
	OwnerCooldown: String,
	UserID: String,
});


module.exports = mongoose.model('ecooldown', Schema);