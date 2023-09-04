/* eslint-disable n/handle-callback-err */
const formidable = require('formidable')

// import models
const { userModel } = require('../models/UserModel')

const { uploadFile, downloadFile } = require('../lib/Firebase')

class SaveVideo {
  // save video to firebase and get the url

  static async postVideo (req, res) {
    try {
      const form = new formidable.IncomingForm()

      form.parse(req, async (err, fields, files) => {
        const id = Number(req.query.id)
        console.log(files)
        // upload video to Firebase
        await uploadFile(files.createVideo.filepath, `video/user${id}`, 'video/mp4')

        // get the Firebase url
        const fileUrl = await downloadFile(`video/user${id}`)
        console.log('fileurl:', fileUrl)

        // save the URL to database
        await userModel.saveVideo(id, fileUrl[0])

        // get updated data list
        setTimeout(async function () {
          const userdata = await userModel.getVideo(id, '')
          res.status(200).json({ status: 'success', data: { video: userdata.video } })
        }, 2000)
      })
    } catch (error) {
      console.log(error)
      res.render('error', { error, message: 'SAVE FILE ERROR' })
    }
  }
}

module.exports = { SaveVideo }
