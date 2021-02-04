const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController{
  static register(req, res, next){
    let {email, password} = req.body
    console.log(email, password)
    User.create({
      email,
      password
    })
    .then(user => {
      console.log(user)
      let response = {
        id: user.id,
        email: user.email
      }
      res.status(201).json(response)
    })
    .catch(err => next(err))
  }

  static async login(req, res, next){
    try {
      let {email, password} = req.body
      let user = await User.findOne({
        where: {email}
      })
      if(!user){
        throw { status: 404 }
      }

      const match = comparePassword(password, user.password)
      if(!match){
        throw { status: 404 }
      }
      const payload = {
        id: user.id,
        email: user.email
      }
      let access_token = generateToken(payload)
      res.status(200).json(access_token)

    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController