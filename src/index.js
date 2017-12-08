const express = require('express')
const db = require('./helper/db')
const cors = require('cors')

db.connect().then(() => {
  const app = express()
  app.use(cors())

  app.listen(4000, () => {
    console.info('Running on http://localhost:4000')
  })
}).catch((e) => {
  console.error(e)
})
