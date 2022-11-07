'use strict';

require('dotenv').config();
const { start } = require('./src/server.js');
const { api_db } = require('./src/auth/models');
const { auth_db } = require('./src/auth/models');
const PORT = process.env.PORT

auth_db.sync()
  .then(() => api_db.sync())
  .then(() => {
    start(PORT);
  });

