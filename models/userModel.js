var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userModel = new Schema({
	firstName: {type: String},
	lastName:{type: String},
	email:{type: String, unique: true},
	password:{type: String},
	createdOn:{type: Date},
	genre:[String],
	subscribed:[{type: mongoose.Schema.Types.ObjectId, ref: 'shows'}],
	image:{type: String, default: 'None'}
});




module.exports = mongoose.model('users', userModel);