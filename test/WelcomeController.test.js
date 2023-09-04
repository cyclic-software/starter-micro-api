// TESTING API PADA WELCOME CONTROLLER
const supertest = require('supertest')
const app = require('../app')

const request = supertest(app)

describe('TWC-01: Test main api connection in endpoint (/)', function () {
  it('Positive case: if the connection is success, there will be welcome message', async function () {
    // hit the API
    const response = await request.get('/')

    // check the result
    // console.log(response)

    // expect the status
    expect(response.status).toBe(200)

    // expect the content is not null
    expect(response.text).toBeDefined()
  })
})
