const express = require('express');
const router = new express.Router();

const auth = require('../middleware/auth');

const User = require('../models/user');

router.post('/users/signup', async function (req, res) {

    console.log(req.body)

    const user = new User(req.body)

    try {

        if (req.body.password !== req.body["password-repeat"]) {
            throw new Error("Passwords don't match")
        }

        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }

});

router.post('/users/login', async function (req, res) {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(500).send();
    }

});

router.post('/users/logout', auth, async function (req, res) {
    try {
        req.user.tokens = req.user.tokens.filter((token) => { token.token !== req.token });
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();

    } catch (e) {
        res.status(500).send()
    }
})



router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

//updating user
router.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {


        console.log(req.user._id)
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();

        // { new: true } to get back the updated user {runValidators} run validation to update
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });


        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router