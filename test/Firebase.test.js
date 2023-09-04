// THIS IS UNIT TESTING FOR FIREBASE

// get library to create absolute file path
const { resolve } = require('path')
const filePath = resolve()

// get function to be tested
const { uploadFile, downloadFile } = require('../lib/Firebase')

describe('TFB-01: test to upload file to firebase and get the file url', function () {
  test('Positive case: file is uploaded to firebase', async function () {
    // assign parameters
    const path = filePath + '/public/images/avatars/avatar.jpg'
    const filename = 'testing/image'
    const filetype = 'image/png'

    // upload file
    await uploadFile(path, filename, filetype)

    // download file
    const response = await downloadFile(filename)

    // check the result
    // console.log(response)

    // expect the result
    expect(response.length).toBe(1)
  })
})
