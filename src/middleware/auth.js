const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {

    try {
        const token = req.headers.cookie.replace('auth=', '');
alert(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error()
        }

        req.token = token;
        req.user = user;

        next();
    } catch (e) {
        res.status(401).render('error', {
            layout: 'default',
            template: 'error-template',
            title: "Please authenticate",
            statusCode: res.statusCode,
            error: e
        })

    }
}

module.exports = auth;
