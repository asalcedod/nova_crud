const express = require('express')
const morgan = require('morgan')
const app = express()
const path = require('path')

const { mongoose } = require('./database')

app.set("port", process.env.PORT || 3030)

app.use(morgan('dev'))
app.use(express.json())
app.use('/api/users', require('./routes/users.routes'))
app.use(express.static(path.join(__dirname + '/public')))

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});