// TESTING API PADA USER GAMES CONTROLLER
const supertest = require('supertest')
const app = require('../app')

const request = supertest(app)

describe('TUG-01: Test to get games that has been played by a user', function () {
  it('Positive case: get games played by user', async function () {
    // hit the API
    const userId = 19
    const response = await request.get(`/usergame/played/${userId}`)

    // check the result
    // console.log(response)

    // expect the status
    expect(response.status).toBe(200)

    // expect the content to have data
    expect(Object.keys(response._body)).toContain('data')

    // if the data is not empty, expect the data to be array of number (game_id)
    if (response._body.data.length > 0) {
      expect(response._body.data[0]).not.toBeNaN()
    }
  })

  it('Negative case: user ID is not a number', async function () {
    // hit the API
    const userId = 'abc'
    const response = await request.get(`/usergame/played/${userId}`)

    // check the result
    // console.log(response)

    // expect the status
    expect(response.status).toBe(500)

    // expect the error
    expect(response.error.text).toBeDefined()
  })
})

describe('TUG-02: Test to get total score per user', function () {
  it('Positive case: get total score per user', async function () {
    // hit the API
    const userId = 19
    const response = await request.get(`/usergame/totalskor/${userId}`)

    // check the result
    // console.log(response)

    // expect the status
    expect(response.status).toBe(200)

    // expect the content to have data
    expect(Object.keys(response._body)).toContain('data')

    // expect the data contains a number
    expect(response._body.data).not.toBeNaN()
  })

  it('Negative case: user id is not number', async function () {
    // hit the API
    const userId = 'abc'
    const response = await request.get(`/usergame/totalskor/${userId}`)

    // check the result
    // console.log(response)

    // expect the status
    expect(response.status).toBe(200)

    // expect the data to be 0
    expect(response._body.data).toBe(0)
  })
})
