const express = require('express')
const timeslots = require('../routes/timeslots')
const users = require('../routes/users')
const error = require('../middleware/error')

module.exports = function (app) {
  app.use(express.json())
  app.use('/api/timeslots', timeslots)
  app.use('/api/users', users)
  app.use(error)
}
