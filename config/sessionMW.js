const session = require("express-session");

const { config } = require("./config");


const maxAge = parseInt(config.SESSION_MAX_AGE)

const sessionMW = session({
	secret: config.SESSION_SECRET_KEY,
	resave: false, 
	saveUninitialized: true,
	cookie: { secure: false, maxAge },
});

module.exports = sessionMW;