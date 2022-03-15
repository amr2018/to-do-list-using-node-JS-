const mongoose = require('mongoose')

const connectURL = ''

function connectDB () {
    return mongoose.connect(connectURL)
}


module.exports = connectDB()
