const router = require('express').Router()
const MovieController = require('../controllers/MovieController')

router.get('/', MovieController)


module.exports = router