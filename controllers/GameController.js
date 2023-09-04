// import models
const { gameListModel } = require('../models/gameListModel')
const { historyUser } = require('../models/history')
const { gameLeaderboard } = require('../models/gameLeaderboard')

class GameController {
  // controller untuk melihat gameList
  static async getGameList (req, res) {
    try {
      // ambil semua data game dari model
      const gameList = await gameListModel.getGameList()
      // kirim semua data ke user
      return res.json({ status: 'success', data: gameList })
    } catch (error) {
      console.log(error)
      res.status(500).send(' Internal Server Error !')
    }
  }

  // controller untuk melihat leaderboard pada setiap game
  static async getGameLeaderboard (req, res) {
    try {
      const gameid = Number(req.params.gameId)

      // ambil data leaderboard per game
      const data = await gameLeaderboard.getGameLeaderboard(gameid)

      // kirim semua data ke user
      return res.json({ status: 'success', data })
    } catch (error) {
      console.log(error)
      res.status(500).send(' Internal Server Error !')
    }
  }

  // controller to insert game score
  static async insertGameScore (req, res) {
    try {
      const data = req.body
      const userId = Number(data.userId)
      const gameUrl = data.gameUrl
      const totalRonde = Number(data.totalRonde)
      const userSkor = Number(data.skor)

      // get game_id from gameUrl info
      const gameId = await gameListModel.getGameId(gameUrl)

      // insert data game to history table
      setTimeout(async () => {
        await historyUser.insertScore(userId, gameId.gameid, totalRonde, userSkor)
        return res.json({ status: 'success', message: 'Score updated!' })
      }, 2000)
    } catch (error) {
      console.log(error)
      return res.status(500).send(' Internal Server Error !')
    }
  }
}
module.exports = { GameController }
