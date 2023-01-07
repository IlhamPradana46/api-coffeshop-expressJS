const {body} = require('express-validator');


const registerValSchema = [
    body('username').notEmpty().withMessage('Username must not be empty')
                    .matches(/^\S*$/).withMessage(`Username cannot contain 'space' character!`)
                    .isLength({min : 3}).withMessage('Username cannot less than 5 character')
                    .matches(/^\S*$/).withMessage(`Password cannot contain 'space' character!`)
                    .escape().withMessage(`Password cannot contain <, >, &, ', ", / character `),

    body('password').notEmpty().withMessage('Password must not be empty')
                    .isLength({min : 5}).withMessage('Password cannot less than 5 characters!')
                    .matches(/^\S*$/).withMessage(`Password cannot contain 'space' character!`)
                    .isAlphanumeric()
                    .escape().withMessage(`Password cannot contain <, >, &, ', ", / character `),

    body('confirm_password').notEmpty().withMessage('Confirm password must not be empty')
]

const loginValSchema = [
    body('username').notEmpty().withMessage('Username must not be empty')
                    .matches(/^\S*$/).withMessage(`Username cannot contain 'space' character!`)
                    .isLength({min : 3}).withMessage('Username cannot less than 5 character')
                    .matches(/^\S*$/).withMessage(`Password cannot contain 'space' character!`)
                    .escape().withMessage(`Password cannot contain <, >, &, ', ", / character `),

    body('password').notEmpty().withMessage('Password must not be empty')
                    .isLength({min : 5}).withMessage('Password cannot less than 5 characters!')
                    .matches(/^\S*$/).withMessage(`Password cannot contain 'space' character!`)
                    .isAlphanumeric()
                    .escape().withMessage(`Password cannot contain <, >, &, ', ", / character `),
]

module.exports = {
    registerValSchema,
    loginValSchema
};