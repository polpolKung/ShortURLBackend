const express = require('express')
const cors = require('cors')
require('dotenv').config()
const router = require('./router.js')
const app = express()

const PORT = process.env.PORT
const corsOptions = {
    origin: '*', 
    methods: 'GET,POST',
    optionsSuccessStatus: 200
  };

app.use(express.urlencoded({extended:false}))
app.use(cors(corsOptions))
app.use(express.json())
app.use('/api',router)



app.listen( PORT || 8080, () => {
    console.log(`Server is running at PORT ${PORT}`);
})