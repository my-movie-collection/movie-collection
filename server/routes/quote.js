const router = require('express').Router()
const Controller = require('../controllers/controller')
const { authorize, authenticate } = require('../middlewares/auth')

router.get('/', Controller.quote)

module.exports = router