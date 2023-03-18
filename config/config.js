const config = {
  botName: process.env.botName,
  PORT: process.env.PORT,
  mongoURI: process.env.mongoURI,
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,
  MONGODB_URL: process.env.MONGODB_URL,
  DB_NAME: process.env.DB_NAME,
  SESSION_MAX_AGE: process.env.SESSION_MAX_AGE,
};

const cors = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

module.exports = { 
	config,
	cors 
};
