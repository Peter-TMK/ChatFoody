const SessionDB = require("../model/session.model");
const messageModel = require("../model/message.model");
const formatMessage = require("../utils/chatMessage");
const { mainMenu, foodMenu } = require("../utils/chatMenu");
const formatArray = require("../utils/chatArray");
const { config } = require("../config/config");

const saveSessionID = async (sessionID) => {
	const checksessionID = await SessionDB.findOne({ sessionID });

	if (!checksessionID) {
		await SessionDB.create({ sessionID });
	}
};

const loadMessage = async (io, sessionID) => {
	const oldMessages = await messageModel.find({ sessionID });

	if(!oldMessages) return;

	oldMessages.forEach((message) => {
		io.to(message.sessionID).emit("user message", message.userMessage);
		io.to(message.sessionID).emit("bot message", message.botMessage);
	});
}

const welcomeMessage = (io, sessionID) => {
	io.to(sessionID).emit(
		"bot message",
		formatMessage(config.botName, "Hi, I'm ChatFoody, your yummy bot!<br>\
		<br>Type and enter 'ChatFoody' to proceed<br/>")
	);
};

const chatMenu = (io, sessionID) => {
	let botMessage = formatMessage(config.botName, formatArray("mainMenu",mainMenu));
	io.to(sessionID).emit("bot message", botMessage);
	return botMessage;
};

const menu = (io, sessionID) => {
	let botMessage = formatMessage(
		config.botName,
		formatArray("Please pick your Menu:<br>", foodMenu)
	);
	io.to(sessionID).emit("bot message", botMessage);
	return botMessage;
};

const checkOutOrder = async (io, sessionID) => {
	const sessionOrder = await SessionDB.findOne({ sessionID });

	let botMessage = "";
	if (sessionOrder.currentOrder.length < 1) {
		botMessage = formatMessage(
			config.botName,
			"No order to place"
		);
		io.to(sessionID).emit("bot message", botMessage);
	} else {
		sessionOrder.placedOrder = [
			...sessionOrder.currentOrder,
			...sessionOrder.placedOrder,
		];
		sessionOrder.currentOrder = [];
		await sessionOrder.save();

		botMessage = formatMessage(config.botName, "Order Placed!");

		io.to(sessionID).emit("bot message", botMessage);
	}
	io.to(sessionID).emit("bot message", formatMessage(config.botName, mainMenu));

	return botMessage;
};

const orderHistory = async (io, sessionID) => {
	const sessionOrder = await SessionDB.findOne({ sessionID });

	let botMessage = "";

	if (sessionOrder.placedOrder.length < 1) {
		botMessage = formatMessage(
			config.botName,
			"You have no order history yet!"
		);
		io.to(sessionID).emit("bot message", botMessage);
	} else {
		botMessage = formatMessage(
			config.botName,
			formatArray("Your Order History", sessionOrder.placedOrder)
		);
		io.to(sessionID).emit("bot message", botMessage);
	}
	io.to(sessionID).emit("bot message", formatMessage(config.botName, mainMenu));

	return botMessage;
};

const currentOrder = async (io, sessionID) => {
	const sessionOrder = await SessionDB.findOne({ sessionID });

	let botMessage = "";

	if (sessionOrder.currentOrder.length < 1) {
		botMessage = formatMessage(config.botName, "You have no order yet!");
		io.to(sessionID).emit("bot message", botMessage);
	} else {
		botMessage = formatMessage(
			config.botName,
			formatArray("Your Current Order", sessionOrder.currentOrder)
		);
		io.to(sessionID).emit("bot message", botMessage);
	}

	io.to(sessionID).emit("bot message", formatMessage(config.botName, mainMenu));

	return botMessage;
};

const cancelOrder = async (io, sessionID) => {
	const sessionOrder = await SessionDB.findOne({ sessionID });

	let botMessage = "";

	if (sessionOrder.currentOrder.length < 1) {
		botMessage = formatMessage(config.botName, "You have no order yet!");

		io.to(sessionID).emit("bot message", botMessage);
	} else {
		botMessage = formatMessage(config.botName, "Order Cancelled!");

		sessionOrder.currentOrder = [];
		await sessionOrder.save();

		io.to(sessionID).emit("bot message", botMessage);
	}
	//TODO: save the resposne to the database
	io.to(sessionID).emit("bot message", formatMessage(config.botName, mainMenu));

	return botMessage;
};

const saveOrder = async (io, sessionID, number) => {
	const sessionOrder = await SessionDB.findOne({ sessionID });

	let botMessage = "";

	if (number === 1) {
		sessionOrder.currentOrder.push(foodMenu[0]);
	}
	if (number === 2) {
		sessionOrder.currentOrder.push(foodMenu[1]);
	}
	if (number === 3) {
		sessionOrder.currentOrder.push(foodMenu[2]);

	}
	if (number === 4) {
		sessionOrder.currentOrder.push(foodMenu[3]);

	}
	if (number === 5) {
		sessionOrder.currentOrder.push(foodMenu[4]);
	}

	await sessionOrder.save();

	botMessage = formatMessage(
		config.botName,
		formatArray("Order Added", sessionOrder.currentOrder)
	);
	io.to(sessionID).emit("bot message", botMessage);

	io.to(sessionID).emit("bot message", formatMessage(config.botName, mainMenu));

	return botMessage;
};

module.exports = {
	saveSessionID,
	loadMessage,
	welcomeMessage,
	chatMenu,
	menu,
	checkOutOrder,
	orderHistory,
	currentOrder,
	cancelOrder,
	saveOrder,
}