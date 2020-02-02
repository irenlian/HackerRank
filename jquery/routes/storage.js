const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/node_modules/jquery/dist/jquery.js', function (req, res) {
    res.sendFile(path.join(__dirname, '/../../node_modules/jquery/dist/jquery.js'));
});
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/../public/search/search.html'));
});
router.get('/hotel', function (req, res) {
    res.sendFile(path.join(__dirname, '/../public/object/options.html'));
});
router.get('/catalog', function (req, res) {
    res.sendFile(path.join(__dirname, '/../public/catalog/catalog.html'));
});

module.exports = router;
