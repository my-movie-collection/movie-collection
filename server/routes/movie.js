const router = require('express').Router()
const MovieController = require('../controllers/MovieController')
const { authorize, authenticate } = require('../middlewares/auth')

// router.use(authenticate)
router.get('/', MovieController.findMovie)
router.get('/film', MovieController.listMovie)


module.exports = router