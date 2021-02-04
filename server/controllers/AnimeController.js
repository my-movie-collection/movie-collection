const { Movie, User, Collection } = require('../models/index')
const axios = require('axios')

class AnimeController {
  static findAnime(req, res, next){
    const title = req.query.t
    axios.get(`https://api.jikan.moe/v3/search/anime?type=movie&page=2`)
    .then(({data}) => res.status(200).json(data))
    .catch(err => next(err))
  }

  static listAnime(req, res, next){
    let film = [`naruto`]
    const Animes = []
    film.forEach(data => {
      axios.get(`https://api.jikan.moe/v3/search/anime?q=${data}`)
      .then(({data}) => {
        Animes.push(data)
        if (Animes.length == film.length) {
          res.status(200).json(Animes)
        }
      })
      .catch(err => next(err))
    })
  }
}

module.exports = AnimeController