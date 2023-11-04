const mongoose = require('mongoose')
const shortId = require('shortid')
require('dotenv').config()

const dbUrl= process.env.MONGO_URI
mongoose.connect(dbUrl, {}).catch(err=>console.log(err))

const shorUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('ShortUrl', shorUrlSchema)