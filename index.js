// import express
const express = require('express')

// import CORS
const cors = require('cors')

// import body-parser
const bodyParser = require('body-parser')

// import routes
const postRoutes = require('./routes/postRoutes')

// init app
const app = express()

// use CORS
app.use(cors())

// use body parser
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// define port
const port = 3000


// ==========================================
// ROUTE UTAMA
// ==========================================

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// ==========================================
// ROUTE POSTS
// ==========================================

app.use('/posts', postRoutes)


// ==========================================
// START SERVER
// ==========================================

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})