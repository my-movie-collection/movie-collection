const router = require('express').Router()
const userRouter = require('./userRouter.js')

router.use('/', userRouter)


module.exports = router