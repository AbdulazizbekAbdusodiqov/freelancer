const Joi = require("joi");

module.exports = {
  adminValidation: (data) => {
    const adminSchema = Joi.object({
      name: Joi.string().required().trim(),
      surname: Joi.string().trim(),
      email: Joi.string().email().required().trim(),
      phone: Joi.string().required().trim(),
      password: Joi.string().min(5).required(),
    });

    return adminSchema.validate(data, { abortEarly: false });
  },
};
