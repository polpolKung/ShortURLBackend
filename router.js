const express = require('express')
const router = express.Router()
const ShortUrl = require('./shortUrl.js')
const urlPattern = /^(https?|ftp):\/\/[A-Za-z0-9.-]+(\S*)?$/



router.get('/shortUrls' , async (req, res)=> {
    const shortUrls = await ShortUrl.find()
    res.json(shortUrls).status(200)
})

router.post('/shortUrls', async (req,res)=> {
    const { fullUrl } = req.body;
    const validUrl = urlPattern.test(fullUrl)
    if (!fullUrl || !validUrl) {
        return res.status(400).send({ error: 'Invalid URL' })
    }
    
    const existingUrl = await ShortUrl.findOne({ full: fullUrl })
    if (existingUrl) {
        res.send(existingUrl);
    } else {
        const newUrl = await ShortUrl.create({full: fullUrl})
        res.send(newUrl).status(200)
    }
})

router.get('/shortUrls/:shortUrl', async (req,res)=> {
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl })
    if(shortUrl === null) {
        return res.status(404).send({ error: 'cannot find URL' })
    } 
    shortUrl.clicks++
    shortUrl.save()
    res.send(shortUrl.full).status(302);
})
    

module.exports = router