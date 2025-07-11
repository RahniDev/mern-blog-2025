const { body, validationResult } = require('express-validator');

exports.userSignupValidator = (req, res, next) => {
    validationBodyRules = [
        body('email', 'email is required').exists(),
        body('password', 'password is required').exists(),
        body('email', 'email is required').notEmpty(),
        body('password', 'password is required').notEmpty()
    ]

    checkRules = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
}