const express = require('express')
const router = express.Router()
const passport = require('../lib/passport')

// import controllers
const { WelcomePageController } = require('../controllers/WelcomeController')
const { LandingPageController } = require('../controllers/LandingPageController')
const { PassportMainController } = require('../controllers/PassportMainController')
const { ProfilePageController } = require('../controllers/ProfilePageController')
const { SaveAvatar } = require('../controllers/SaveAvatarController')
const { GameController } = require('../controllers/GameController')
const { UserGamesController } = require('../controllers/UserGamesController')
const { SaveVideo } = require('../controllers/VideoController')
const { AudioController } = require('../controllers/AudioController')

// import functions related with avatar
const { userModel } = require('../models/UserModel')
const { defaultAvatar } = require('../lib/Firebase')

/* WELCOME PAGE */
router.get('/', WelcomePageController.welcome)

/* REGISTER PAGE */
router.get('/register', PassportMainController.getRegisterPage)
router.post('/register', PassportMainController.postRegisterPage)

/* LOGIN PAGE */
router.get('/login', PassportMainController.getLoginPage)
router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.send(401, { success: false, message: info.message })
    }

    req.login(user, async function (err) {
      if (err) {
        return next(err)
      }
      // get avatar of user. If none in database, then create default avatar
      let avatar = ''
      const userAvatar = await userModel.getAvatar(0, req.user.username)
      if (userAvatar.avatar) {
        avatar = userAvatar.avatar
      } else {
        avatar = await defaultAvatar()
      }

      res.status(200).json({
        status: 'success',
        data: {
          id: req.user.id,
          username: req.user.username,
          avatar
        }
      })
    })
  })(req, res, next)
})

/* router utk komponen landingpage */
router.get('/gamelist/trending', LandingPageController.trendingGames)
router.get('/gamelist/popular', LandingPageController.popularGames)
router.get('/gamelist/comingsoon', LandingPageController.comingSoonGames)
router.get('/player/leaderboard', LandingPageController.playerLeaderboard)
router.get('/player/community', LandingPageController.playerCommunity)

/* router untuk komponen profile page */
router.get('/profile/get/:id', ProfilePageController.getProfilePage)
router.post('/profile/upsert/:id', ProfilePageController.upsertProfile)
router.get('/profile/history/:id', ProfilePageController.getUserHistory)
router.post('/avatar/save', SaveAvatar.postAvatar)
router.post('/video/save', SaveVideo.postVideo)

/* router untuk komponen game page */
router.get('/gamelist/get', GameController.getGameList)
router.get('/gamelist/leaderboard/:gameId', GameController.getGameLeaderboard)
router.post('/game/insert-score', GameController.insertGameScore)

/* router untuk komponen game terkait dengan user */
router.get('/usergame/played/:id', UserGamesController.getUserPlayedGames)
router.get('/usergame/totalskor/:id', UserGamesController.totalSkorUser)

/* router untuk mengambil audio dari firebase */
router.get('/audio/get', AudioController.getRPSAudio)
router.post('/audio/save', AudioController.postAudio)

module.exports = router
