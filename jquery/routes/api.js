const express = require('express');
const router = express.Router();
const db = require('../db');

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

router.post('/catalog/data', function (req, res) {
    /* The task is to calculate sum of points to sort hotels */

    // Making maps from arrays
    const properties = db.properties.reduce((properties, item) => {
        properties[item.type] = { ...item };
        return properties;
    }, {});
    properties.utilities.options = properties.utilities.options.reduce((utilities, item) => {
        utilities[item.id] = item;
        return utilities;
    }, {});

    // Separating reviews for different hotels and making map
    const reviews = db.reviews.reduce((reviews, item) => {
        if (!reviews[item.hotelId]) reviews[item.hotelId] = [];
        reviews[item.hotelId].push(item);
        return reviews;
    }, {});

    // Preparing catalog, calculating points and adding data
    let catalog = db.hotels.map((dbdata) => {
        let hotel = { ...dbdata };
        // stars
        hotel.points = properties.stars.points * hotel.stars / properties.stars.options.length;
        hotel.stars = properties.stars.options[hotel.stars - 1];
        // utilities filter
        if (req.body.selectedUtilities) {
            req.body.selectedUtilities.forEach((filter) => {
                if (dbdata.utilities.indexOf(parseInt(filter, 10)) === -1) {
                    hotel.exclude = true;
                    return;
                }
            });
            // if this hotel doesn't match filter, so exclude it
            if (hotel.exclude) return;
        }
        // utilities
        hotel.utilities = [];
        dbdata.utilities.forEach((item) => {
            hotel.utilities.push(properties.utilities.options[item].name);
            hotel.points += properties.utilities.options[item].points;
        });
        // reviews
        if (reviews[hotel.id]) {
            const sum = reviews[hotel.id].reduce((sum, review) => {
                sum += review.rate;
                return sum;
            }, 0);
            hotel.rate = sum / reviews[hotel.id].length;
            hotel.reviews = properties.reviews.options.find((review) => hotel.rate > review.value).name;
            hotel.points += hotel.rate / 10 * properties.reviews.points;
        } else {
            hotel.reviews = 'no reviews';
        }
        return hotel;
    });
    // remove excluded hotels
    catalog = catalog.filter(function (el) {
        return el != null;
    });
    catalog.sort((a,b) => b.points - a.points);
    res.send(catalog);
});

router.get('/attribute', function (req, res) {
    const utilities = db.properties.find((property) => property.type === 'utilities');
    if (utilities) {
        res.send(utilities.options);
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;
