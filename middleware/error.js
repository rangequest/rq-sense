const logger = require('../logger')

module.exports = function (err, req, res, next) {
  logger.error(err)
  return res.status(500).send('Somethings failed')
}
