const { sequelize } = require('../config')

// get model
const { userModel } = require('../models/UserModel')
const { historyUser } = require('../models/history')

class gameLeaderboard {
  // get leaderboard per game
  static async getGameLeaderboard (gameId) {
    try {
      // get model from each table
      const userTable = await userModel.getModel()
      const historyTable = await historyUser.getModel()

      // create association
      userTable.hasMany(historyTable, { foreignKey: 'userId' })

      const [data] = await sequelize.query(`
            SELECT *
            FROM (
                SELECT 
                    *,
                    RANK() OVER (PARTITION BY game_id ORDER BY score DESC) AS rank
                FROM (
                    SELECT 
                        game_id,
                        "user".id as user_id,
                        "user".username,
                        SUM(user_skor) as score
                    FROM history
                    LEFT JOIN "user" ON "user".id = history.user_id
                    WHERE game_id = ${gameId}
                    GROUP BY game_id, "user".id, "user".username
                    HAVING SUM(user_skor) > 0
                    ) score_list 
            ) score_list_2 
            WHERE rank <= 3
            ORDER BY game_id, rank
            ;`)

      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

module.exports = { gameLeaderboard }
