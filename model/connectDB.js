const mongoose = require("mongoose");
const { config } = require("../config/config");

function connectMongo(server) {
	mongoose.set("strictQuery", false);
	mongoose
		.connect(config.local_db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			dbName: config.db_name,
		})
		.then(() =>
			server.listen(config.PORT, () => {
				console.log(`Database connected and app server running on port ${config.PORT} successfully!`);
			})
		)
		.catch((err) => console.log(err));
}

module.exports = connectMongo;
