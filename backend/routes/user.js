import express from 'express'
const router = express.Router()

import { requireSignin, isAuth, isAdmin } from '../controllers/auth.js' 

import { userById, read } from '../controllers/user.js'

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.get('/user/:userId', requireSignin, isAuth, read)

router.param('userId', userById)

export default router