/**
 * Main router.
 * @version 1.0.0
 * @since 1.0.0
 */
const express = require('express')
const router  = express.Router()

/**
 * Send welcome message.
 * @return {String} message
 * @since 1.0.0
 */
router.get('/', (req, res) => {
    res.send('Hello world!!')
})

module.exports = router