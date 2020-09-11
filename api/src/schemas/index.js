const Joi = require('@hapi/joi');

module.exports = {
  scoreSchema: Joi.object({
    score: Joi.number().required()
  }),
  userSchema: Joi.object({
    username: Joi.string().min(2).max(100).required()
  })
}