const express = require('express');
const router = new express.Router();

//Mongoose models
const Gif = require('../models/gif');

//routes

// Mongoose CRUD (Create, Read, Update, Delete) 

router.post('/gifs', async function (req, res) {

  try {
    const gifs = await Gif.insertMany(JSON.parse(req.body.urlList))
    res.status(201).send(gifs);
  } catch (e) {
    res.status(400).send(e);
  }

});

router.get('/gifs', async function (req, res) {

  try {
    const gifs = await Gif.find()
    res.status(200).send(gifs)
  } catch(e) {
    res.status(500).send()    
  }
  
});

router.delete('/gifs', async function (req, res) {
  const urls = req.body.urlList.map( el => el.url )
  try {
    const gif = await Gif.deleteMany({ url: {$in: urls}} )
    res.status(200).send(gif)
  } catch(e) {
    res.status(404).send(e)
  }
});



module.exports = router;