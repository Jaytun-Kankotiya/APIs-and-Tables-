const mongoose = require('mongoose')
require('dotenv').config()


const mongoUri = process.env.MONGODB

const initializeData = async () => {
    await mongoose.connect(mongoUri).then(() => {
        console.log("Connected to database")
    }).catch((error) => console.log("Error connecting to the Database."))
}

module.exports = {initializeData} 