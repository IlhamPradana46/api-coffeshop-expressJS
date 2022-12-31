const Joi = require('@hapi/joi');

// Product Form Validation

const productValidation = data => {
    const schema = Joi.object({
        product_name : Joi.string().min(3).required(),
        stock : Joi.number().required(),
        price : Joi.number().required(),
        photo : Joi.any()
    });

    return schema.validate(data);
}

module.exports.productValidation = productValidation;


