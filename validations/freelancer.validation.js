const Joi = require("joi");

module.exports = {
  freelancerValidation: (data) => {
    const freelancerSchema = Joi.object({
      name: Joi.string().required().trim().empty(""),
      surname: Joi.string().trim(),
      email: Joi.string().email().required().trim(),
      phone: Joi.string().required().trim(),
      bio: Joi.string().required().trim(),
      hourly_rate: Joi.number().required(),
      portfolio_url: Joi.string().uri().required().trim(),
      availability: Joi.boolean().strict().default(false),
      rating: Joi.number().min(0).max(5),
      password: Joi.string().min(8).required(),
      is_active: Joi.boolean().strict().default(false),
      refresh_token: Joi.string(),
    });

    return freelancerSchema.validate(data, { abortEarly: false });
  },
};
