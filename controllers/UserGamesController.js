// import models
const { historyUser } = require('../models/history');

class UserGamesController {
    //controller untuk melihat game yang sdh dimainkan user
    static async getUserPlayedGames(req, res) {
        try {
            const userId = Number(req.params.id)

            // ambil data dari table history
            const gameList = await historyUser.getPlayedGames(userId);

            // convert ke array of game id
            let gameIdList = []
            gameList.map((gameid) => {
                gameIdList.push(gameid.gameId)
            })

            // kirim semua data ke user
            return res.json({ status: 'success', data: gameIdList });
        } catch (error) {
            console.log(error);
            res.status(500).send(' Internal Server Error !');
        }
    }

    // conroller untuk mengambil total skor user
    static async totalSkorUser(req, res) {
        const userId = req.params.id
        try {
            // get user skor
            const userSkor = await historyUser.getUserScore(userId);      

            // send data
            return res.json({ status: 'success', data: Number(userSkor.totalSkor) > 0 ? Number(userSkor.totalSkor) : 0 });
            
        } catch (error) {
            console.log(error);
            res.status(500).send(' Internal Server Error !');
        }
    }
}

module.exports = { UserGamesController }
