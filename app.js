
// import modules
const express = require('express')
const task_route = require('./routes/api/task')
// connect to DB
const db = require('./db/conn')


// start app
const app = express()

// set Middel Where
app.use(express.json())
app.use('/api/task/', task_route)
// set statac pages
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/index.html')
})



// start listinning
app.listen(8080)