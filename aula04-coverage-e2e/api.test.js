const { describe, it } = require('mocha')
const request = require('supertest')
const assert = require('assert')
const app = require('./api')

describe('API Suite test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP status 200', async () => {
      const response = await request(app)
        .get('/contact')
        .expect(200)
      assert.deepStrictEqual(response.text, 'Contact Us page')
    })
  })

  describe('/hello', () => {
    it('should request an inexistent route /hi and redirect to /hello', async () => {
      const response = await request(app)
        .get('/hi')
        .expect(200)
      assert.deepStrictEqual(response.text, 'Hello World')
    })
  })

  describe('/login', () => {
    it('should login successfully on the route and retiurn HTTP status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: "usuario", password: "senha" })
        .expect(200)
      assert.deepStrictEqual(response.text, 'Login has succeeded')
    })

    it('should reject login with invalid username', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: "usuario_invalido", password: "senha" })
        .expect(401)
      assert.ok(response.unauthorized)
      assert.deepStrictEqual(response.text, 'Login failed')
    })

    it('should reject login with invalid password', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: "usuario", password: "senha_invalida" })
        .expect(401)
      assert.ok(response.unauthorized)
      assert.deepStrictEqual(response.text, 'Login failed')
    })
  })
})