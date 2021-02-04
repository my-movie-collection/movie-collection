const { Movie, User, Collection } = require('../models')

class CollectionController {
  static showList(req, res, next) {
    const user_id = req.user.id
    User.findByPk(user_id,{
      include: [Movie]
    })
    .then(data => {
      res.status(200).json(data.Movies)
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteCollection(req, res, next) {
    const movie_id = req.params.id
    Collection.destroy({
      where: {
        movie_id
      }
    })
    .then(() => {
      res.status(200)
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = CollectionController