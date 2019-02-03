/**
 * Create users router.
 * @version 1.0.0
 * @since 1.0.0
 */
const express = require('express')
const router  = express.Router()
const db      = require('../connection')

/**
 * Import helpers.
 */
const verifyToken = require('../helpers/middleware').verifyToken

/**
 * Get list of users.
 * @return {Array} users List of users.
 * @since 1.0.0
 */
router.get('/', [verifyToken], (req, res) => {
    db.query("SELECT user_id as ID, username, fullname FROM table_users", (err, results) => {
        if (err) throw err
        res.send({
            status: true,
            message: '',
            data: results
        })
    })
})

/**
 * User authentication.
 * @return {Array} user User data.
 * @since 1.0.0
 */
router.post('/login', (req, res) => {
    // get data login
    const username = req.body.username
    const password = req.body.password

    // setup query
    const query = "SELECT user_id as ID, fullname FROM table_users WHERE username = ? AND password = ?"

    // check user in database
    db.query(query, [username, password], (err, results) => {
        if (err) throw err

        // validate account
        if (results.length === 0) {
            res.send({
                status: true,
                message: 'account_not_exist',
                data: {}
            })
            return
        }

        // get secret key
        const fs = require('fs')
        const secretkey = fs.readFileSync('./auth/public.key', 'utf8')

        // generate token with JWT
        const jwt = require('jsonwebtoken')

        jwt.sign({
            ID: results[0].user_id,
            username: username,
            fullname: results[0].fullname
        }, secretkey, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err
            res.send({
                status: true,
                message: '',
                data: {
                    ID: results[0].user_id,
                    username: username,
                    fullname: results[0].fullname,
                    token: token
                }
            })
        })
    })
})

module.exports = router