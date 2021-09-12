const express = require('express')
const timeslots = require('../routes/timeslots')

module.exports = function (app) {
  app.use(express.json())
  app.use('/api/timeslots', timeslots)
}
