const Joi = require("joi");
const express = require("express");
const app = express();

module.exports.userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
