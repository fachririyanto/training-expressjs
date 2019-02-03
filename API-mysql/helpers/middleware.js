/**
 * Verify jwt token.
 * @version 1.0.0
 * @since 1.0.0
 */
const verifyToken = (req, res, next) => {
    // get auth header value
    const bearerHeader = req.headers['authorization'];

    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // split at the space
        const bearer = bearerHeader.split(' ');

        // get token from array
        const bearerToken = bearer[1];

        // set the token
        req.token = bearerToken;

        // get secret key
        const fs = require('fs')
        const secretkey = fs.readFileSync('./auth/public.key', 'utf8')

        /* verifying token. */
        const jwt = require('jsonwebtoken')
        jwt.verify(bearerToken, secretkey, (err, decoded) => {
            if (err) throw err
            next()
        })
    } else {
        // forbidden
        res.sendStatus(403);
    }
}

module.exports = {
    verifyToken: verifyToken
}