const mongoose = require('mongoose')

const connectURL = 'mongodb+srv://amr666:JBeUYVENUUyZ5nW@amrapps.fgbme.mongodb.net/tasks_app?retryWrites=true&w=majority'

function connectDB () {
    return mongoose.connect(connectURL)
}


module.exports = connectDB()