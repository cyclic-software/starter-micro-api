const supertest = require('supertest')
const app = require('../app')

const request = supertest(app)

describe('TSP-01: This testing is for get profile API', () => {
  return it('Positive case: user can get all profile data', async () => {
    // Hit api
    const userId = 19
    const respons = await request.get(`/profile/get/${userId}`)

    // Jika api-nya ngasih respons status 200
    // console.log(respons)
    expect(respons.status).toBe(200)

    // Isi datanya harus berupa object yg punya key data
    expect(Object.keys(respons._body)).toContain('data')

    // expect the query result is not null
    expect(respons._body.data[0]).toBeUndefined()

    // Didalam key data itu dia punya id,username,email,umur,city,country
    expect(Object.keys(respons._body.data)).toContain('id')
    expect(Object.keys(respons._body.data)).toContain('username')
    expect(Object.keys(respons._body.data)).toContain('email')
    expect(Object.keys(respons._body.data)).toContain('umur')
    expect(Object.keys(respons._body.data)).toContain('city')
    expect(Object.keys(respons._body.data)).toContain('country')
  })
})

describe('TSP-02: This testing is for post profile API', () => {
  return it('Positive case: user can post profile data', async () => {
    // Hit api
    const userId = 20
    const respons = await request.post(`/profile/upsert/${userId}`).send({
      id: 0,
      username: '',
      email: '',
      umur: 0,
      city: '',
      country: ''
    })

    // Jika api-nya ngasih respons status 200
    // console.log(respons)
    expect(respons.status).toBe(200)

    // Isi datanya harus berupa object yg punya key username
    expect(Object.keys(respons._body)).toContain('username')
  })
})

describe('TSP-03: This testing is for get history API', () => {
  return it('Positive case: user can get all history game', async () => {
    // Hit api
    const userId = 19
    const respons = await request.get(`/profile/history/${userId}`)

    // Jika api-nya ngasih respons status 200
    expect(respons.status).toBe(200)

    // Isi datanya harus berupa object yg punya key data
    expect(Object.keys(respons._body)).toContain('data')

    // expect the query result is not null
    expect(respons._body.data[0]).toBeDefined()

    // Didalam key data itu dia punya id,gameName,playtime,totalRonde,userSkor
    expect(Object.keys(respons._body.data[0])).toContain('id')
    expect(Object.keys(respons._body.data[0])).toContain('gameName')
    expect(Object.keys(respons._body.data[0])).toContain('playtime')
    expect(Object.keys(respons._body.data[0])).toContain('totalRonde')
    expect(Object.keys(respons._body.data[0])).toContain('userSkor')
  })
})
