const express = require('express');
const router = express.Router();

//Mongoose models
const Gif = require('./models/gif');

//API fetching
const searchGif = require('./gifs')

//routes
router.get('/', async function(req, res) {

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

router.post('/gifs', async function(req, res) {

    const gif = new Gif({
        ...req.body
        // ...req.body,
        // owner: req.user._id
    })

    try {
        await gif.save();
        res.status(201).send(gif);
    } catch(e) {
        res.status(400).send(e);
    }
});

module.exports = router;