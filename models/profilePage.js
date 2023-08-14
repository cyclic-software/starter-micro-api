const { Sequelize } = require('sequelize');
const { col } = Sequelize;

// get models
const { userModel } = require('../models/UserModel');
const { biodataUser } = require('../models/biodataUser');
const { historyUser } = require('../models/history');
const { gameListModel } = require('../models/gameListModel');

// get default avatar url
const { defaultAvatar } = require('../lib/Firebase')

class ProfilePageModel {    

    // get all user profile data
    static async getUserData(id) {
        try {
            // get model from each table
            const userTable = await userModel.getModel();
            const biodataTable = await biodataUser.getModel();
            const defaultAvatarUrl = await defaultAvatar();

            // create association
            userTable.hasOne(biodataTable, {foreignKey: "userId"});

            const dataUser = await userTable.findOne({
                where: {
                    id
                },
                attributes: [
                    'id',
                    'username',
                    'email', 
                    [Sequelize.literal(`COALESCE("user".avatar, '${defaultAvatarUrl}')`), 'avatar'],
                    [col('"biodataUser"."umur"'), 'umur'],
                    [col('"biodataUser"."city"'), 'city'],
                    [col('"biodataUser"."country"'), 'country']
                ],
                include: [
                    {
                        model: biodataTable,
                        attributes: []
                    }
                ],
                raw: true
            })
            return dataUser
        } catch(error) {
            console.log(error)
            return error
        }
    }



    // get user game history data
    static async getUserGameHistory(userId) {
        try {
            // get model from table
            const historyTable = await historyUser.getModel();
            const gamelistTable = await gameListModel.getModel();

            // create association 
            historyTable.belongsTo(gamelistTable, {foreignKey: "gameId"});

            // create query
            const data = await historyTable.findAll({
                where: {userId},
                attributes: [
                    'id',
                    [col('"gamelist"."game_name"'), 'gameName'],
                    [Sequelize.literal('to_char(created_at + interval \'7 hour\', \'YYYY-MM-DD HH:MI:SS\')'), 'playtime'],
                    'totalRonde', 
                    'userSkor'
                ],
                include: [
                    {
                        model: gamelistTable,
                        attributes: []
                    }
                ],
                order: [['playtime', 'DESC']],
                raw: true
            })
            return data

        } catch(error) {
            console.log(error)
            return error
        }
    }

}

    
module.exports = { ProfilePageModel }