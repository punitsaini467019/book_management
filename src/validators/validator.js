const Joi = require('joi');

exports.addBookVal = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    summary:Joi.string().required()
})

exports.updateBookVal = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    summary: Joi.string().required()
})