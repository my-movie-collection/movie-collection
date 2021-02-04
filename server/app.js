if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
  console.log('dotenv activated')
}

const express = require('express')
const cors = require('cors')
const router = require('./routes/index')

const app = express()
const PORT = 3000

// Cors
app.use(cors())

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

// Routes
app.use(router)

// Listener
app.listen(PORT, () => {
  console.log('app running on port ' + PORT)
})