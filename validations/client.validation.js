const Joi = require("joi");

module.exports = {
  clientValidation: (data) => {
    const clientSchema = Joi.object({
      name: Joi.string().required().trim(),
      surname: Joi.string().trim(),
      email: Joi.string().email().required().trim(),
      phone: Joi.string().required().trim(),
      password: Joi.string().min(5).required(),
      bio: Joi.string().required().trim(),
      is_active: Joi.boolean().strict().default(false),
      verification: Joi.string().required(),
    });

    return clientSchema.validate(data, { abortEarly: false });
  },
};
