const request = require('supertest')
let server

describe('/api/timeslots', () => {
  describe('GET /', () => {
    beforeEach(() => {
      server = require('../../index')
    })
    afterEach(async () => {
      await server.close()
    })
    it('should return a list of time slots', async () => {
      const res = await request(server).get('/api/timeslots')
      expect(res.status).toBe(200)
    })
  })
})
