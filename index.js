const express = require('express')
const app = express()
const cors = require('cors')
const videosRouter = require('./routes/videos')
const bodyParser = require('body-parser');

app.use(cors())
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());

app.use('/videos', videosRouter)


app.get('/', (req, res) => {
    res.send("Hello, World!")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})