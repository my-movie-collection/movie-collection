const router = require('express').Router()
const userRouter = require('./userRouter.js')
const movieRouter = require('./movie')
const { authenticate } =  require('../middlewares/auth')

// router.use('/', userRouter)

// router.use('/movies', movieRouter)

router.use(authenticate)

router.get('/', (req, res) => {
    res.send("masuukkkk")
})

module.exports = router