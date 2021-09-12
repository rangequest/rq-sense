const request = require('supertest')
const { User } = require('../../models/user')
describe('/api/users', () => {
  let server

  describe('GET /', () => {
    beforeEach(() => {
      server = require('../../index')
    })
    afterEach(async () => {
      await server.close()
    })
    it('should return a list of users', async () => {
      const res = await request(server).get('/api/users')
      expect(res.status).toBe(200)
    })
  })

  describe('POST /', () => {
    let name
    let password
    let email
    const exec = () => {
      return request(server).post('/api/users').send({ name, email, password })
    }

    beforeEach(() => {
      name = 'abcde'
      password = 'abcde'
      email = 'a@bcde.com'
      server = require('../../index')
    })

    afterEach(async () => {
      await server.close()
      await User.deleteMany({})
    })

    it('should return 400 if name is not present', async () => {
      name = ''
      const res = await exec()
      expect(res.status).toBe(400)
    })

    it('should return 400 if email is not present', async () => {
      email = ''
      const res = await exec()
      expect(res.status).toBe(400)
    })

    it('should return 400 if password is not present', async () => {
      password = ''
      const res = await exec()
      expect(res.status).toBe(400)
    })

    it('should return 400 if user already registered', async () => {
      const user = new User({ name, email, password })
      await user.save()
      const res = await exec()
      expect(res.status).toBe(400)
    })

    it('should save user if valid user array is passed', async () => {
      email = 'hello@world.com'
      const res = await exec()
      const userFromDb = await User.findOne({ email: 'hello@world.com' })
      expect(userFromDb.email).toEqual(email)
      expect(res.status).toBe(200)
    })

    it('should send back the token and user array', async () => {
      const res = await exec()
      expect(res.status).toBe(200)
      expect(res.body._id).toBeDefined()
      expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['_id', 'name', 'email']))
    })
  })
})
