const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const mongoose = require('mongoose');
const { Publication, validate } = require('../models/publication');
const { User } = require('../models/user');

router.get('/', async (req, res) => {
    const publications = await Publication.find().sort('createdAt');
    res.send(publications);
});


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.user);
    if (!user) return res.status(400).send('Invalid user.');

    const publication = new Publication({
        titre: req.body.titre,
        photo: req.body.photo,
        description: req.body.description,
        user: {
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            age: user.age,
            phoneNumber: user.phoneNumber
        }
    });
    await publication.save();

    res.send(publication);
});



router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.user);
    if (!user) return res.status(400).send('Invalid User.');

    const publication = await Publication.findByIdAndUpdate(req.params.id,
        {
            titre: req.body.titre,
            photo: req.body.photo,
            description: req.body.description,
            user: {
                fullName: user.fullName,
                email: user.email,
                password: user.password,
                age: user.age,
                phoneNumber: user.phoneNumber
            }
        }, { new: true });

    if (!publication) return res.status(404).send('The publication with the given ID was not found.');

    res.send(publication);
});




router.get('/:id', async (req, res) => {
    const publication = await Publication.findById(req.params.id);

    if (!publication) return res.status(404).send('The publication with the given ID was not found.');

    res.send(publication);
});



router.delete('/:id', async (req, res) => {
    const publication = await Publication.findByIdAndRemove(req.params.id);

    if (!publication) return res.status(404).send('The publication with the given ID was not found.');

    res.send(publication);
});


module.exports = router;