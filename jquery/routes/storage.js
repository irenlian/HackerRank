const express = require('express');

const router = express.Router();
const path = require('path');

router.get('/node_modules/jquery/dist/jquery.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../node_modules/jquery/dist/jquery.js'));
});
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/search/search.html'));
});
router.get('/hotel', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/object/options.html'));
});
router.get('/catalog', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/catalog/catalog.html'));
});

module.exports = router;
