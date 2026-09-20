const Joi = require("joi");
const express = require("express");
const app = express();

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

app.post("/register", (req, res) => {
  const { error, value } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Proceed with validated data in 'value'
  res.json({ message: "User registered", data: value });
});
