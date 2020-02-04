const express = require('express');
const storageRoutes = require('./routes/storage');
const apiRoutes = require('./routes/api');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', storageRoutes);
app.use('/api', apiRoutes);
app.use(express.static(__dirname + '/public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
