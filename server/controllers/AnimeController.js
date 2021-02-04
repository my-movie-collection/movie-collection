const { Movie, User, Collection } = require('../models/index')
const axios = require('axios')

class AnimeController {
  static listAnime(req, res, next){
    axios.get(`https://api.jikan.moe/v3/search/anime?type=tv&sort=desc&limit=10&order_by=score`)
    .then(({data}) => res.status(200).json(data))
    .catch(err => next(err))
  }

  static addAnime(req, res, next){
    const title = req.query.t
    const user_id = req.user.id
    let movieData;
    axios.get(`https://api.jikan.moe/v3/search/anime?q=${title}&limit=1`)
    .then(({data}) => {
      console.log(data)
      let year = `${new Date(data.results[0].start_date).getFullYear()}`
      let newAnime = {
        title,
        year,
        genre: 'Anime' ,
        plot: data.results[0].synopsis,
        poster: data.results[0].image_url,
        imdbRating: data.results[0].score
      }
      console.log(newAnime)
      return Movie.create(newAnime)
    })
    .then(movie => {
      movieData = movie
      return Collection.create({
        user_id,
        movie_id: movie.id
      })
    })
    .then(() => {
      res.status(200).json(movieData)
    })
    .catch(err => {
      next(err)
    })
  }

  static findAnime(req, res, next) {
    const title = req.query.t
    axios.get(`https://api.jikan.moe/v3/search/anime?q=${title}&limit=1`)
    .then(({data}) => {res.status(200).json(data)})
    .catch(err => next(err))
  }
}

module.exports = AnimeController