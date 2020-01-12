const express = require('express');
const path = require('path');
const app = express();

app.get('/hotel-name', function (req, res) {
  res.send('Marina Hotel');
});
app.get('/hotel-accommodation', function (req, res) {
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
app.get('/catalog', function (req, res) {
  res.send('Here will be catalog');
});



app.get('/node_modules/jquery/dist/jquery.js', function (req, res) {
  res.sendFile(path.join(__dirname, '/../node_modules/jquery/dist/jquery.js'));
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/search/search.html'));
});
app.get('/hotel', function (req, res) {
  res.sendFile(path.join(__dirname, '/object/options.html'));
});
app.get('/search.js', function (req, res) {
  res.sendFile(path.join(__dirname, '/search/search.js'));
});
app.get('/options.js', function (req, res) {
  res.sendFile(path.join(__dirname, '/object/options.js'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
