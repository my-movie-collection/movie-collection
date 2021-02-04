'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsToMany(models.User, {
        through: models.Collection,
        foreignKey: 'movie_id'
      })
    }
  };
  Movie.init({
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    genre: DataTypes.STRING,
    plot: DataTypes.STRING,
    poster: DataTypes.STRING,
    imdbRating: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};