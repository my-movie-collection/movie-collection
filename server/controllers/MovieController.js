const { Movie, User, Collection } = require('../models/index')
const axios = require('axios')

class MovieController {
  static findMovie(req, res, next){
    const title = req.query.t
    axios.get(`http://www.omdbapi.com/?apikey=b0de76c2&t=${title}`)
    .then(({data}) => {res.status(200).json(data)})
    .catch(err => next(err))
  }

  static listMovie(req, res, next){
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=514c3d688d8b3a36b37707a05e1deebc&language=en-US&page=1`)
    .then(({data}) => res.status(200).json(data.results))
    .catch(err => next(err))
  }

  static addMovie(req, res, next){
    const title = req.body.title
    const user_id = req.user.id
    console.log(title, user_id, 'ini dalem findMovie')
    let movieData;
    axios.get(`http://www.omdbapi.com/?apikey=b0de76c2&t=${title}`)
    .then(({data}) => {
      const newMovie = {
        title: data.Title,
        year: data.Year,
        genre: data.Genre,
        plot: data.Plot,
        poster: data.Poster,
        imdbRating: data.imdbRating
      }
      return Movie.create(newMovie)
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

  // static listMovie(req, res, next){
  //   let film = ['taken', 'batman', 'superman', `Godzilla vs. Kong`, `Avengers: Endgame`, `The Wolf of Wall Street`, `Knives Out`, `The Shawshank Redemption`, `Split`]
  //   const movies = []
  //   film.forEach(data => {
  //     axios.get(`http://www.omdbapi.com/?apikey=b0de76c2&t=${data}`)
  //     .then(({data}) => {
  //       movies.push(data)
  //       if (movies.length == film.length) {
  //         res.status(200).json(movies)
  //       }
  //     })
  //     .catch(err => next(err))
  //   })
  // }
}

module.exports = MovieController