// import package here to load environment
const express = require('express')

// Get routes to the variabel
const router = require('./src/routes')

const app = express()

const port = 3000

app.use(express.json())

// Add endpoint grouping and router
app.use('/api/v1/', router)

// add route here to serving static file
app.use('/uploads', express.static('/uploads'))

app.listen(port, () => console.log(`Listening on port ${port}!`))