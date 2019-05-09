const express = require('express');
const router = new express.Router();

//API fetching
const searchGif = require('../gifs')

router.get('/', async function (req, res) {

    const gifs = await searchGif(req.query.term)
  
    try {
      res.render('home', {
        layout: 'default',
        template: 'home-template',
        gifs
      });
  
    } catch (e) {
      res.send(e)
    }
  
  });

  router.get('/users/signup', async function (req, res) {
    //TODOS do something with the remember me button
    try {
        res.render('signup', {
            layout: 'default',
            template: 'signup-template'
        });

    } catch (e) {
        res.send(e)
    }

})

  module.exports = router;