const router = require('express').Router()
const userRouter = require('./userRouter.js')
const movieRouter = require('./movie')
const animeRouter = require('./anime')
const collectionRouter = require('./collection')
const quote = require('./quote')
const { authenticate } =  require('../middlewares/auth')

router.use('/', quote)
router.use('/', userRouter)
router.use(authenticate)
router.use('/movies', movieRouter)
router.use('/anime', animeRouter)
router.use('/', collectionRouter)


router.get('/', (req, res) => {
    res.send("masuukkkk")
})

module.exports = router