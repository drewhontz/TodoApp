const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User', {
	email: {
		type: String,
		required: true,
		minlength: 3,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email address'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});


module.exports = {User};