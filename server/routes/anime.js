const router = require('express').Router()
const AnimeController = require('../controllers/AnimeController')
const { authorize, authenticate } = require('../middlewares/auth')

// router.use(authenticate)
router.get('/', AnimeController.findAnime)
router.get('/film', AnimeController.listAnime)


module.exports = router