const db = require('../db');

let properties = null;
let reviews = null;

let catalogCache = null;

const makePropertiesMap = () => {
    // Making maps from arrays
    properties = db.properties.reduce((properties, item) => {
        properties[item.type] = { ...item };
        return properties;
    }, {});
    properties.utilities.options = properties.utilities.options.reduce((utilities, item) => {
        utilities[item.id] = item;
        return utilities;
    }, {});

    // Separating reviews for different hotels and making map
    reviews = db.reviews.reduce((reviews, item) => {
        if (!reviews[item.hotelId]) reviews[item.hotelId] = [];
        reviews[item.hotelId].push(item);
        return reviews;
    }, {});
};

const composeCatalogData = () => {
    // Preparing catalog, calculating points using weight of each attribute
    catalogCache = db.hotels.map((dbdata) => {
        let hotel = { ...dbdata };
        // stars
        hotel.points = properties.stars.points * hotel.stars / properties.stars.options.length;
        hotel.stars = properties.stars.options[hotel.stars - 1];
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
    catalogCache.sort((a,b) => b.points - a.points);

    // delete cache to make it update each minute
    setTimeout(() => {
        catalogCache = null
    }, 60000);
};

const filterByUtilities = (catalog, utilitiesFilter) => {
    // utilitiesFilter is array of ids
    return catalog.filter((hotel) => {
        for (let i = 0; i < utilitiesFilter.length; i++) {
            // find name of filtered util
            const utilId = utilitiesFilter[i];
            const utilItem = properties.utilities.options[utilId];
            // check if this util is not in list of hotel
            if (hotel.utilities.indexOf(utilItem.name) === -1) {
                return false;
            }
        }
        return true;
    });
};

module.exports = (req, res) => {
    /* The task is to calculate sum of points to sort hotels */

    // Making maps from arrays (once)
    if (!properties) makePropertiesMap();

    // Preparing catalog, calculating points and adding data
    // (updating each minute)
    if (!catalogCache) composeCatalogData();

    let catalog = catalogCache;

    // filter by utilities
    if (req.body.selectedUtilities) catalog = filterByUtilities(catalog, req.body.selectedUtilities);

    res.send(catalog);
};
