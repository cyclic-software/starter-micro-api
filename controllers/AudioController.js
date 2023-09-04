/* eslint-disable n/handle-callback-err */
const formidable = require('formidable')

// import models
const { userModel } = require('../models/UserModel')

const { uploadFile, downloadFile } = require('../lib/Firebase')

class AudioController {
  // controller untuk mengambil audio untuk game
  static async getRPSAudio (req, res) {
    try {
      const id = Number(req.query.id)
      // Get audio URL for the user
      const audioURL = await userModel.getAudio(id)
      if (audioURL === null) {
        const audioURL = await downloadFile('audio/rps-music.mp3')
        return res.json({ audioURL: audioURL[0] })
      } else {
        return res.json({ audioURL })
      }
    } catch (error) {
      console.error('Error fetching audio from Firebase:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  // controller untuk upload audio
  static async postAudio (req, res) {
    try {
      const form = new formidable.IncomingForm()

      form.parse(req, async (err, fields, files) => {
        const id = Number(req.query.id)
        console.log(files)
        // upload audio to Firebase
        await uploadFile(files.createAudio.filepath, `audio/user${id}`, 'audio/mp3')

        // get the Firebase url
        const fileUrl = await downloadFile(`audio/user${id}`)
        console.log('fileurl:', fileUrl)

        // save the URL to database
        await userModel.saveAudio(id, fileUrl[0])

        res.status(200).json({ status: 'success', message: 'New audio uploaded' })
      })
    } catch (error) {
      console.log(error)
      res.render('error', { error, message: 'SAVE FILE ERROR' })
    }
  }
}

module.exports = { AudioController }
