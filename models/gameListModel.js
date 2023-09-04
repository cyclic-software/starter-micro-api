/* eslint-disable camelcase */
const { DataTypes, Op } = require('sequelize')
const { sequelizeReader } = require('../config/dbReader')

class GameList {
  #model = sequelizeReader.define('gamelist', {
    gameid: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    game_name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    game_description: {
      type: DataTypes.STRING
    },
    game_image_url: {
      type: DataTypes.STRING
    },
    game_url: {
      unique: true,
      type: DataTypes.STRING
    },
    game_type: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'gamelist',
    updatedAt: false,
    createdAt: false,
    underscored: true
  })

  //= == QUERY
  // get all game list
  async getGameList () {
    try {
      const data = await this.#model.findAll({
        where: { game_type: { [Op.in]: ['trending', 'popular'] } },
        raw: true
      })
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // get trending game list
  async getTrendingGameList () {
    try {
      const data = await this.#model.findAll({
        where: { game_type: 'trending' },
        order: [['gameid', 'DESC']],
        limit: 3,
        raw: true
      })
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // get popular game list
  async getPopularGameList () {
    try {
      const data = await this.#model.findAll({
        where: { game_type: 'popular' },
        order: [['gameid', 'DESC']],
        limit: 5,
        raw: true
      })
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // get coming soon game list
  async getComingSoonGameList () {
    try {
      const data = await this.#model.findAll({
        where: { game_type: 'comingsoon' },
        order: [['gameid', 'DESC']],
        limit: 3,
        raw: true
      })
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // get the model
  async getModel () {
    return this.#model
  }

  // get game id from game url
  async getGameId (game_url) {
    try {
      const data = await this.#model.findOne({
        where: { game_url },
        attributes: ['gameid'],
        raw: true
      })
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }
};

const gameListModel = new GameList()
module.exports = { gameListModel }
