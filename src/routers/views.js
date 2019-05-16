const express = require('express');
const router = new express.Router();

const User = require('../models/user');
const auth = require('../middleware/auth');

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

router.get('/users', auth, async function (req, res) {

  const gifs = await searchGif(req.query.term)

  try {
    res.render('userHome', {
      layout: 'default',
      template: 'userhome-template',
      gifs, 
      user :req.user
    });

  } catch (e) {
    res.status(400).send(e);
  }

});

router.get('/users/profile', auth, async function (req, res) {

const user = await User.findById(req.user.id).populate('gifs');

gifs = user.gifs.map( el => ( {url: el.url} ))

console.log(user)
  try {
    res.render('userProfile', {
      layout: 'default',
      template: 'userhome-template',
      gifs,
      user :req.user
    });

  } catch (e) {
    res.status(400).send(e);
  }

});

router.get('/signup', async function (req, res) {

  try {
    res.render('signup', {
      layout: 'default',
      template: 'signup-template'
      
    });

  } catch (e) {
    console.log(e)
    res.send(e)
  }

})

router.get('/login', async function (req, res) {

  try {
    res.render('login', {
      layout: 'default',
      template: 'login-template'
    });

  } catch (e) {
    res.send(e)
  }

})


module.exports = router;