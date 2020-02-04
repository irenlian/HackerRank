const express = require('express');
const bodyParser = require('body-parser');
const storageRoutes = require('./routes/storage');
const apiRoutes = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', storageRoutes);
app.use('/api', apiRoutes);
app.use(express.static(`${__dirname}/public`));

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
