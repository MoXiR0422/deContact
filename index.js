const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')

const userRoutes = require('./routes/userRoutes')
const contactRoutes = require('./routes/contactRoutes')
const connect = require('./config/mongoose')
connect()


app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use('/api/users', userRoutes)
app.use('/api/users', contactRoutes)


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log('server is running');
})
