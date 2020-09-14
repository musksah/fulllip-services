const express = require('express');
const keys = require('../keys');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(keys.databaseSession);


module.exports = {

    sessionStore
}