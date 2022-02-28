const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/auth.model');


module.exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        console.log(token);

        if (!token) return res.status(403).json({ message: "No token provided" })
        const decode = jwt.verify(token, config.SECRET)
        console.log(decode)
        req.userId = decode.dim;

        const user = await User.findById(req.userId, { password: 0 })
        console.log(user)
        if (!user) return res.status(404).json({ message: "no user found" })
        next()

    } catch (error) {
        return res.status(401).json({ message: 'error 401 unauthorized' })
    }



}   