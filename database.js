const mongoose = require("mongoose");
const { config } = require("./config/config");

function connectToMongoDB(server) {
	mongoose.set("strictQuery", false);
	mongoose
		.connect(config.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			dbName: config.DB_NAME,
		})
		.then(() =>
			server.listen(config.PORT, () => {
				console.log(`Database connected and app server running on port ${config.PORT} successfully!`);
			})
		)
		.catch((err) => console.log(err));
}

module.exports = connectToMongoDB;
