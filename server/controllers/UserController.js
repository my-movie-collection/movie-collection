const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

class UserController{
  static register(req, res, next){
    let {email, password} = req.body
    // console.log(email, password)
    User.create({
      email,
      password
    })
    .then(user => {
      // console.log(user)
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
      res.status(200).json({access_token})

    } catch (err) {
      next(err)
    }
  }

  static googleLogin(req, res, next){
    let {id_token} = req.body
    // console.log(id_token, 'ini buat google login')
    const client = new OAuth2Client(process.env.CLIENT_ID)
    let email = ''
    let password = ''
    // console.log(client, '<<<< ini client')
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload()
      email = payload.email
      password = 'randomPassword'
      //findOne by email dulu buat cek emailnya udah ada atau belum. kalo blm ada, dibikin dulu. kalo udah ada, lanjut login
      return User.findOne({
        where: {email}
      })
    })
    .then(user => {
      if (user){
        // console.log('masuk if then kedua')
        return user
      } else{
        // console.log('masuk else then kedua')
        return User.create({
          email,
          password
        })
      }
    })
    .then(user => {
      const {id, email} = user
      const payload = {
        id,
        email
      }
      const access_token = generateToken(payload)
      // console.log(access_token, 'ini access token')
      res.status(200).json(access_token)
    })
    .catch(err => {
      res.status(500).json({msg: 'internal server error'})
    })
  }
}

module.exports = UserController