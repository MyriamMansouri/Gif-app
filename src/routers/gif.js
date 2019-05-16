const express = require('express');
const router = new express.Router();

const auth = require('../middleware/auth');

//Mongoose models
const Gif = require('../models/gif');

//routes

// Mongoose CRUD (Create, Read, Update, Delete) 

router.post('/gifs', auth, async function (req, res) {
  const gifsArr = JSON.parse(req.body.urlList)
  const gifs = gifsArr.map(el => ({ url: el, owner: req.user._id }))

  try {
    await Gif.insertMany(gifs)
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }

});


router.delete('/gifs', auth, async function (req, res) {

  const gifsArr = req.body.urlList
  const gifs = gifsArr.map(el => ({ url: el, owner: req.user._id}))

  try {

    for (const gif of gifs ) {
      await Gif.deleteMany(gif)
    }

  } catch (e) {
    res.status(404).send(e)
  }
});



module.exports = router;