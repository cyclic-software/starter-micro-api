// import models
const { gameListModel } = require('../models/gameListModel');
const { historyUser } = require('../models/history');
const { gameLeaderboard } = require('../models/gameLeaderboard')

class GameController {
    //controller untuk melihat gameList
    static async getGameList(req, res) {
        try {
            // ambil semua data game dari model
            const gameList = await gameListModel.getGameList();
            // kirim semua data ke user
            return res.json({ status: 'success', data: gameList });
        } catch (error) {
            console.log(error);
            res.status(500).send(' Internal Server Error !');
        }
    }

    //controller untuk melihat leaderboard pada setiap game
    static async getGameLeaderboard(req, res) {
        try {
            const gameid = Number(req.params.gameId)

            // ambil data leaderboard per game
            const data = await gameLeaderboard.getGameLeaderboard(gameid);

            // kirim semua data ke user
            return res.json({ status: 'success', data: data });
        } catch (error) {
            console.log(error);
            res.status(500).send(' Internal Server Error !');
        }
    }

    // controller to insert game score
    static async insertRPSscore(req, res) {
        try {
            const data = req.body;
            const user_id = Number(data.user_id);
            const game_id = Number(data.game_id);
            const total_ronde = Number(data.total_ronde);
            const user_skor = Number(data.skor);
            await historyUser.insertScore(user_id, game_id, total_ronde, user_skor);
            return res.json({ status: 'success', message: "Score updated!" }); 
        } catch (error) {
            console.log(error);
            return res.status(500).send(' Internal Server Error !');
        }
    }

    // controller to insert game score
    static async insertGameScore(req, res) {
        try {
            const data = req.body;
            const user_id = Number(data.user_id);
            const game_url = data.game_url;
            const total_ronde = Number(data.total_ronde);
            const user_skor = Number(data.skor);

            // get game_id from game_url info
            const gameId = await gameListModel.getGameId(game_url);

            // insert data game to history table
            setTimeout(async () => {
                await historyUser.insertScore(user_id, gameId.gameid, total_ronde, user_skor);
                return res.json({ status: 'success', message: "Score updated!" }); 
            }, 2000);
        } catch (error) {
            console.log(error);
            return res.status(500).send(' Internal Server Error !');
        }
    }
}

module.exports = { GameController }