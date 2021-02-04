if (process.env.NODE_ENV == 'development'){
  require('dotenv').config()
  console.log('dotenv activated')
}

const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(router)


app.listen(PORT, () => {
  console.log('app running on port' + PORT)
})