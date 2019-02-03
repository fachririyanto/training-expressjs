/**
 * Create engine using NodeJS and ExpressJS.
 * @version 1.0.0
 */
const express    = require('express')
const bodyParser = require('body-parser')
const app        = express()
const port       = 8000

/**
 * Setup router.
 */
const router = {
    main: require('./router/main'),
    user: require('./router/user')
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// allow client to access API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
})

// registering router & creating server
app
    .use('/', router.main)
    .use('/users', router.user)
    .listen(port, () => console.log('Running on http://localhost:' + port))