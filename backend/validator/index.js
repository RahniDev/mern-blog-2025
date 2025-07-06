exports.userSignupValidator = async (req, res, next) => {
    // checks if empty
//    await check('name', 'Name is required').notEmpty().run(req)
   await body('email').isEmail()
//        await check('password', 'Password is required').notEmpty().run(req)
//    await check('password').run(req)
//     .isLength({ min: 6 })
//     .withMessage('Password must contain at least 6 characters')
//     .matches(/\d/) // must have at least one digit 
//     .withMessage("Password must contain a number")
    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({ error: firstError })
    }
    // when creating middleware, next() prevents app from coming to hault
    // and moves it to next phase whether it succeeded or failed
    next()
}