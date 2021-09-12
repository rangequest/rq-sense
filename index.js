const express = require('express')
const app = express()
const logger = require('./logger')

require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')()

const port = process.env.PORT || 3000
const server = app.listen(port, () =>
  logger.log({ level: 'info', message: `Server is listening on port ${port}...` })
)
module.exports = server
