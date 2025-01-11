const Joi = require("joi");

module.exports = {
  freelancerValidation: (data) => {
    const freelancerSchema = Joi.object({
      name: Joi.string().required().trim(),
      surname: Joi.string().trim(),
      email: Joi.string().email().required().trim(),
      phone: Joi.string().required().trim(),
      bio: Joi.string().required().trim(),
      hourly_rate: Joi.number().required().trim(),
      portfolio_url: Joi.string().required().trim(),
      availability: Joi.boolean().default(false),
      rating: Joi.number(),
      password: Joi.string().required(),
      is_active: Joi.boolean().default(false),
      refres: Joi.boolean().default(false),
    });

    return freelancerSchema.validate(data, { abortEarly: false });
  },
};