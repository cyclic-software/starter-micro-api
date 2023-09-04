/* eslint-disable array-callback-return */
// TESTING API PADA LANDING PAGE CONTROLLER
const supertest = require('supertest')
const app = require('../app')

const request = supertest(app)

describe('TLP-01: Test to get player community list', function () {
  it('Positive case: get all player details for community', async function () {
    // hit the API
    const response = await request.get('/player/community')

    // check the result
    // console.log(response);

    // expect the status
    expect(response.status).toBe(200)

    // expect the content to have data
    expect(Object.keys(response._body)).toContain('data')

    // expect the query result is not null
    expect(response._body.data[0]).toBeDefined()

    // expect the array contains needful keys
    expect(response._body.data[0]).toHaveProperty('id')
    expect(response._body.data[0]).toHaveProperty('username')
    expect(response._body.data[0]).toHaveProperty('email')
    expect(response._body.data[0]).toHaveProperty('avatar')
    expect(response._body.data[0]).toHaveProperty('age')
    expect(response._body.data[0]).toHaveProperty('city')
    expect(response._body.data[0]).toHaveProperty('country')
    expect(response._body.data[0]).toHaveProperty('score')
    expect(response._body.data[0]).toHaveProperty('rank')
  })
})

describe('TLP-02: Test to get player leaderboard list', function () {
  it('Positive case: get top 5 players for leaderboard', async function () {
    // hit the API
    const response = await request.get('/player/leaderboard')

    // check the result
    // console.log(response);

    // expect the status
    expect(response.status).toBe(200)

    // expect the content to have data
    expect(Object.keys(response._body)).toContain('data')

    // expect the query result length is equal to 5
    expect(response._body.data.length).toEqual(5)

    // expect the array contains needful keys
    expect(response._body.data[0]).toHaveProperty('id')
    expect(response._body.data[0]).toHaveProperty('username')
    expect(response._body.data[0]).toHaveProperty('avatar')
    expect(response._body.data[0]).toHaveProperty('score')
    expect(response._body.data[0]).toHaveProperty('rank')
  })
})

describe('TLP-03: Test to get player trending games list', function () {
  it('Positive case: get 3 games for trending games list', async function () {
    // hit the API
    const response = await request.get('/gamelist/trending')

    // check the result
    // console.log(response)

    // expect the status
    expect(response.status).toBe(200)

    // expect the content to have data
    expect(Object.keys(response._body)).toContain('data')

    // expect the query result length is equal to 3
    expect(response._body.data.length).toEqual(3)

    // expect the array contains needful keys
    expect(response._body.data[0]).toHaveProperty('gameid')
    expect(response._body.data[0]).toHaveProperty('game_name')
    expect(response._body.data[0]).toHaveProperty('game_description')
    expect(response._body.data[0]).toHaveProperty('game_image_url')
    expect(response._body.data[0]).toHaveProperty('game_url')
    expect(response._body.data[0]).toHaveProperty('game_type')

    // expect the game type are all trending
    response._body.data.map((game) => {
      expect(game.game_type).toBe('trending')
    })
  })
})

describe('TLP-04: Test to get player popular games list', function () {
  it('Positive case: get 5 games for popular games list', async function () {
    // hit the API
    const response = await request.get('/gamelist/popular')

    // check the result
    // console.log(response)

    // expect the status
    expect(response.status).toBe(200)

    // expect the content to have data
    expect(Object.keys(response._body)).toContain('data')

    // expect the query result length is equal to 5
    expect(response._body.data.length).toEqual(5)

    // expect the array contains needful keys
    expect(response._body.data[0]).toHaveProperty('gameid')
    expect(response._body.data[0]).toHaveProperty('game_name')
    expect(response._body.data[0]).toHaveProperty('game_description')
    expect(response._body.data[0]).toHaveProperty('game_image_url')
    expect(response._body.data[0]).toHaveProperty('game_url')
    expect(response._body.data[0]).toHaveProperty('game_type')

    // expect the game type are all trending
    response._body.data.map((game) => {
      expect(game.game_type).toBe('popular')
    })
  })
})

describe('TLP-05: Test to get player comingsoon games list', function () {
  it('Positive case: get 3 games for comingsoon games list', async function () {
    // hit the API
    const response = await request.get('/gamelist/comingsoon')

    // check the result
    // console.log(response)

    // expect the status
    expect(response.status).toBe(200)

    // expect the content to have data
    expect(Object.keys(response._body)).toContain('data')

    // expect the query result length is equal to 3
    expect(response._body.data.length).toEqual(3)

    // expect the array contains needful keys
    expect(response._body.data[0]).toHaveProperty('gameid')
    expect(response._body.data[0]).toHaveProperty('game_name')
    expect(response._body.data[0]).toHaveProperty('game_description')
    expect(response._body.data[0]).toHaveProperty('game_image_url')
    expect(response._body.data[0]).toHaveProperty('game_url')
    expect(response._body.data[0]).toHaveProperty('game_type')

    // expect the game type are all trending
    response._body.data.map((game) => {
      expect(game.game_type).toBe('comingsoon')
    })
  })
})
