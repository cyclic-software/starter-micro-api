// import models
const { userModel } = require('../models/UserModel')
const { biodataUser } = require('../models/biodataUser')
const { ProfilePageModel } = require('../models/profilePage')

class ProfilePageController {
  // get data dan biodata user
  static async getProfilePage (req, res) {
    try {
      // get all data related with user
      const userProfile = await ProfilePageModel.getUserData(Number(req.params.id))

      // send data
      return res.json({ status: 'success', data: userProfile })
    } catch (error) {
      console.log(error)
      res.status(500).send(' Internal Server Error !')
    }
  }

  // update or insert data of user
  static async upsertProfile (req, res) {
    try {
      // get data from req
      const userId = Number(req.params.id)
      const newUsername = req.body.username
      const newEmail = req.body.email
      const newUmur = Number(req.body.umur)
      const newCity = req.body.city
      const newCountry = req.body.country

      // Cek apakah username sudah ada di DB
      const existingUsername = await userModel.getData(newUsername)
      if (existingUsername) {
        return res.status(200).json({ status: 'failed', message: 'USERNAME ALREADY REGISTERED, PLEASE USE DIFFERENT USERNAME !' })
      }

      // Cek apakah email sudah ada di DB
      const existingEmail = await userModel.getDataByEmail(newEmail)
      if (existingEmail) {
        return res.status(200).json({ status: 'failed', message: 'EMAIL ALREADY REGISTERED, PLEASE USE DIFFERENT EMAIL !' })
      }

      // Mengecek Ketersediaan Data Biodata
      const existingBio = await biodataUser.getBioByUserId(userId)

      // Mengambil data eksisting dari kedua tabel
      const existingUser = await ProfilePageModel.getUserData(userId)

      // Update tabel user jika ada email/username yang diganti
      if (newUsername !== '' || newEmail !== '') {
        const updatedUserData = {
          username: newUsername || existingUser.username,
          email: newEmail || existingUser.email
        }
        await userModel.updateData(userId, updatedUserData.username, updatedUserData.email)
      }

      // Update tabel biodata jika ada umur/city/country yang diganti
      if (newUmur !== '' || newCity !== '' || newCountry !== '') {
        if (!existingBio) {
          await biodataUser.insertBiodataUser(userId, newUmur, newCity, newCountry)
        } else {
          const updatedBiodata = {
            umur: newUmur || existingUser.umur,
            city: newCity || existingUser.city,
            country: newCountry || existingUser.country
          }
          await biodataUser.updateData(userId, updatedBiodata.umur, updatedBiodata.city, updatedBiodata.country)
        }
      }

      return res.status(200).json({ status: 'success', username: newUsername || existingUser.username })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 'failed', message: 'Update Profile Failed' })
    }
  }

  // get user history game
  static async getUserHistory (req, res) {
    try {
      const userId = Number(req.params.id)

      // get game history data per user
      const userHistory = await ProfilePageModel.getUserGameHistory(userId)

      // send data
      return res.json({ status: 'success', data: userHistory })
    } catch (error) {
      console.log(error)
      return res.status(500).send(' Internal Server Error !')
    }
  }
}

module.exports = { ProfilePageController }
