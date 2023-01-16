/** @format */

const mongoose = require('mongoose');
const TrainSchema = new mongoose.Schema({
  id: Number,
  name: String,
  start_station: String,
  end_station: String,
  time_of_departure: String,
});

TrainSchema.methods.joiValidate = function (obj) {
  var Joi = require('joi');
  var schema = {
    //   id: Joi.types.number(),
    //   name:Joi.types.String().min(6).max(30).required(),
    //   start_station: Joi.types.String().min(6).max(30).required(),
    //   end_station: Joi.types.String().min(6).max(30).required(),
    //   time_of_departure: Joi.types.Date(),
  };
  return Joi.validate(obj, schema);
};

module.exports = mongoose.model('Train', TrainSchema);

