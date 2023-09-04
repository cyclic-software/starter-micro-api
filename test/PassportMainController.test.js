// TESTING API PADA PASSPORT MAIN CONTROLLER
const supertest = require('supertest')
const app = require('../app')

const request = supertest(app)

describe('TPM-01: Ini adalah pengujian untuk API register', function () {
  it('Kasus positif: user berhasil register:', async function () {
    const response = await request.post('/register').send({
      email: 'matakau13@gmail.com',
      username: 'mata13',
      password: 'QQqq!!11',
      confirm_password: 'QQqq!!11'
    })

    // Pastikan status respons adalah 200
    // console.log(response)
    expect(response.status).toBe(200)

    // Pastikan teks respons sudah didefinisikan
    expect(response.text).toBeDefined()

    // Parse teks respons sebagai JSON
    const responseBody = JSON.parse(response.text)

    // Pastikan properti "status" dan "message" ada di dalam respons
    expect(responseBody).toHaveProperty('message', 'DATA IS SUCCESSFULLY REGISTERED')
    expect(responseBody).toHaveProperty('status', 'success')

    // Jika ingin memeriksa properti lainnya di dalam "data"
    if (responseBody.data) {
      expect(responseBody.data).toHaveProperty('id')
      expect(responseBody.data).toHaveProperty('email')
      expect(responseBody.data).toHaveProperty('username')
      expect(responseBody.data).toHaveProperty('password')
      expect(responseBody.data).toHaveProperty('confirm_password')
    }
  })

  it('Kasus negatif1: user memasukkan EMAIL yang sudah ada di database/yang sudah terdaftar', async function () {
    const response = await request.post('/register').send({
      email: 'megalodon@gmail.com',
      username: 'megalodon',
      password: 'QQqq!!11',
      confirm_password: 'QQqq!!11'
    })

    // Pastikan status respons adalah 400
    // console.log(response)
    expect(response.status).toBe(400)

    // Pastikan teks respons sudah didefinisikan
    expect(response.text).toBeDefined()

    // Parse teks respons sebagai JSON
    const responseBody = JSON.parse(response.text)

    // Pastikan properti "status" dan "message" ada di dalam respons
    expect(responseBody).toHaveProperty('message', 'EMAIL ALREADY REGISTERED, PLEASE USE DIFFERENT EMAIL !')
    expect(responseBody).toHaveProperty('status', 'failed')
  })

  it('Kasus negatif2: user memasukkan USERNAME yang sudah ada di database/yang sudah terdaftar', async function () {
    const response = await request.post('/register').send({
      email: 'megalodonA@gmail.com',
      username: 'megalodon',
      password: 'QQqq!!11',
      confirm_password: 'QQqq!!11'
    })

    // Pastikan status respons adalah 400
    // console.log(response)
    expect(response.status).toBe(400)

    // Pastikan teks respons sudah didefinisikan
    expect(response.text).toBeDefined()

    // Parse teks respons sebagai JSON
    const responseBody = JSON.parse(response.text)

    // Pastikan properti "status" dan "message" ada di dalam respons
    expect(responseBody).toHaveProperty('message', 'USERNAME ALREADY REGISTERED, PLEASE USE DIFFERENT USERNAME !')
    expect(responseBody).toHaveProperty('status', 'failed')
  })

  it('Kasus negatif3: user memasukkan PASSWORD dan CONFIRM PASSWORD nya beda', async function () {
    const response = await request.post('/register').send({
      email: 'megalodon@gmail.com',
      username: 'megalodon',
      password: 'QQqq!!11',
      confirm_password: 'QQqq!!22'
    })

    // Pastikan status respons adalah 400
    // console.log(response)
    expect(response.status).toBe(400)

    // Pastikan teks respons sudah didefinisikan
    expect(response.text).toBeDefined()

    // Parse teks respons sebagai JSON
    const responseBody = JSON.parse(response.text)

    // Pastikan properti "status" dan "message" ada di dalam respons
    expect(responseBody).toHaveProperty('message', 'PASSWORD AND CONFIRMATION PASSWORD DO NOT MATCH')
    expect(responseBody).toHaveProperty('status', 'failed')
  })

  it('Kasus negatif4: user memasukkan PASSWORD, TAPI TIDAK SESUAI VALIDASI', async function () {
    const response = await request.post('/register').send({
      email: 'ayamjago@gmail.com',
      username: 'ayamjago',
      password: 'abc',
      confirm_password: 'abc'
    })

    // Pastikan status respons adalah 400
    // console.log(response)
    expect(response.status).toBe(400)

    // Pastikan teks respons sudah didefinisikan
    expect(response.text).toBeDefined()

    // Parse teks respons sebagai JSON
    const responseBody = JSON.parse(response.text)

    // Pastikan properti "status" dan "message" ada di dalam respons
    expect(responseBody).toHaveProperty('message', 'WRONG PASSWORD. MINIMUM PASSWORD MUST CONTAIN 2 UPPERCASE LETTERS, 2 SMALL LETTERS, 2 NUMBERS, AND 2 SYMBOLS')
    expect(responseBody).toHaveProperty('status', 'failed')
  })
})

describe('TPM-02: Ini adalah pengujian untuk API login', function () {
  it('Kasus positif: user BERHASIL login:', async function () {
    const response = await request.post('/login').send({
      username: 'megalodon',
      password: 'QQqq!!11'
    })

    // Pastikan status respons adalah 200
    // console.log(response)
    expect(response.status).toBe(200)

    // Parse teks respons sebagai JSON
    const responseBody = JSON.parse(response.text)

    // Pastikan properti "status" ada di dalam respons
    expect(responseBody.status).toBe('success')

    // Pastikan properti "data" ada di dalam respons dan memiliki properti "username"
    expect(responseBody.data).toHaveProperty('username')
  })

  it('Kasus negatif1: user memasukkan USERNAME yang tidak ada di database/belum terdaftar', async function () {
    const response = await request.post('/login').send({
      username: 'megalodon1',
      password: 'QQqq!!11'
    })

    // Pastikan status respons adalah 401
    // console.log(response)
    expect(response.status).toBe(401)
  })

  it('Kasus negatif: user memasukkan PASSWORD yang salah', async function () {
    const response = await request.post('/login').send({
      username: 'megalodon',
      password: 'QQqq!!11A'
    })

    // Pastikan status respons adalah 401
    // console.log(response)
    expect(response.status).toBe(401)
  })
})
