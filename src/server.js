'use strict';

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes.js');
const v1 = require('./routes/v1.js');
const v2 = require('./routes/v2.js');
const bearer = require('./auth/auth-middleware/bearer.js');

const logger = require('./auth/auth-middleware/logger.js');
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');

const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use('/api/v1', v1);
app.use('/api/v2', bearer, v2);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log('App is running on port :: ' + port));
  }
}
