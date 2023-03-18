const mainMenu = [
	{ number: 1, text: "Place An Order" },
	{ number: 99, text: "Checkout Order" },
	{ number: 98, text: "See Order History" },
	{ number: 97, text: "See Current Order" },
	{ number: 0, text: "Cancel your Order" },
];

const foodMenu = [
	{ number: 1, food: "Sharwama", price: 1700 },
	{ number: 2, food: "Cup-Cake", price: 550 },
	{ number: 3, food: "Pepper-soup", price: 850 },
	{ number: 4, food: "Fried Rice", price: 1400 },
	{ number: 5, food: "Semo with beef", price: 1500 },
	{ number: 6, food: "Semo with fish", price: 1350 },
	{ number: 7, food: "Poundo with beef", price: 1450 },
	{ number: 8, food: "Poundo with fish", price: 1300 },
	{ number: 9, food: "Jollof", price: 1300 },
	{ number: 10, food: "Salad", price: 1100 },
];

module.exports = {
	mainMenu,
	foodMenu,
};
