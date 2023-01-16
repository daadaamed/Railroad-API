const mongoose = require('mongoose');
const GareSchema = new mongoose.Schema({
    id: Number,
    name: String,
    open_hour: String,
    close_hour: String,
	image: String,
});

// GareSchema.methods.joiValidate = function(obj) {
// 	var Joi = require('joi');
// 	var schema = {
//         //id: Joi.types.number(),
// 		//username: Joi.types.String().min(6).max(30).required(),
// 		//password: Joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
// 		//email: Joi.types.String().email().required(),
// 		//first_name: Joi.types.String().required(),
// 		//last_name: Joi.types.String().required(),
//         //is_admin: Joi.types.Boolean(),
// 		//created_at: Joi.types.Date(),
// 	}
// 	return Joi.validate(obj, schema);
// }

module.exports = mongoose.model('Gare', GareSchema);