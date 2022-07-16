'use strict';

require('dotenv').config();

module.exports = {
  pgEncryptKey: process.env.PGCRYPTO_ENCRPTION_KEY
};
