const mongoose = require('mongoose')

mongoose.Promise = Promise

const appName = require('../../package.json').name

const addr = `mongodb://${process.env.DB_ADDR || 'localhost' }/${appName}`

module.exports = {
  mongoose,
  connect: () => {
    return mongoose.connect(addr, { useMongoClient: true })
  },
  disconnect: () => {
    mongoose.disconnect()
  }
}
