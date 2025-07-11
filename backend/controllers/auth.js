import User from "../models/User.js"
import jwt from 'jsonwebtoken'; // to generate signed token
import { expressjwt } from "express-jwt";// for authorization check
import dotenv from 'dotenv'
dotenv.config()

export const signup = async (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(() => {
            user.salt = undefined;
            user.hashed_password = undefined;
            res.json({
                user
            });
        })
        .catch((err) => {
            return res.status(400).json({
                error: err
            });
        })
};


export const signin = (req, res) => {
    return fetch('http://localhost:8000/signin', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
};

export const requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: ["HS256"]
});

export const isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};

export const isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin only! Access denied'
        });
    }
    next();
};