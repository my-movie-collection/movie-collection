if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = 3000

// Cors
app.use(cors())

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

// Routes
app.use(router)
app.use(errorHandler)

// Listener
app.listen(PORT, () => {
  console.log('app running on port ' + PORT)
})