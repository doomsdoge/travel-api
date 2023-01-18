const express = require('express')
const app = express()
app.use(express.json())

// cors
const cors = require('cors')
app.use(cors())

const PORT = 5000

// Sequelize Synchronous --adhoc
/* const Sequelize = require('sequelize')
const Models = require('./models')
Models.sequelize.sync({
    force: false,
    alter: true,
    logging: console.log
}).then(function () {
    console.log('Database is Synchronized')
}).catch(function(err) {
    console.log(err, 'Something went wrong with Database Update!')
}) */

app.get('/', (req, res) => {
    res.status(200).send('API is running')
})

// import router
const { userRouter } = require('./router')
app.use('/traveloko', userRouter)

app.listen(PORT, () => console.log('API is running on PORT ' + PORT))