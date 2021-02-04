const jwt = require('jsonwebtoken')
const { Collection } = require('../models/index')

const authenticate = (req, res, next) => {
  const token = req.headers.access_token

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    if (decoded){
      req.user = decoded
    }
    next()
  }catch (err){
    res.status(401).json({
      message: "Invalid Token"
    })
  }
}

const authorize = (req, res, next) => {
  const option = {
    where: {
      id: +req.params.id
    }
  }

  Collection.findOne(option)
    .then(data => {
      if (data.user_id === req.user.id){
        next()
      }else {
        res.status(401).json({ message: "Access denied" })
      }
    })
    .catch(err => {
      res.status(404).json({ message: "Data not found" })
    })
}


module.exports = {
  authenticate,
  authorize
}