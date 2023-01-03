const {body} = require('express-validator');

const productValSchema = [
    body('product_name').notEmpty().withMessage('input must not be empty'),
    body('stock').isInt().withMessage('input must be int').
                    notEmpty().withMessage('input must not be empty'),
    body('price').isInt().withMessage('input must be int').
                    notEmpty().withMessage('input must not be empty')
]

module.exports = productValSchema;