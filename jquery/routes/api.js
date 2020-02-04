const express = require('express');
const catalogController = require('../controllers/catalogController');
const db = require('../db');

const router = express.Router();

router.get('/hotel-name', function (req, res) {
    res.send('Marina Hotel');
});

router.get('/hotel-accommodation', function (req, res) {
    const options = [
        {
            type: 'Standart room',
            sleeps: 2,
            price: 2000,
            breakfast: 300,
        },
        {
            type: 'Double room',
            sleeps: 2,
            price: 4000,
            breakfast: 500,
        }
    ];
    res.send(options);
});

router.post('/catalog/data', catalogController);

router.get('/attribute', function (req, res) {
    const utilities = db.properties.find((property) => property.type === 'utilities');
    if (utilities) {
        res.send(utilities.options);
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;
