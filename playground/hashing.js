const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
	id: 10
};

var token = jwt.sign(data, '123abc');
var decoded = jwt.verify(token, '123abc');

console.log('decoded', decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// var data = {
// 	id: 4
// }

// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'some salt').toString()
// }

// token.data.id = 5;

// var resultHash = SHA256(JSON.stringify(token.data) + 'some salt').toString();
// if (resultHash === token.hash) {
// 	console.log('Data was not changed');
// } else {
// 	console.log('Data was changed. Do not trust!');
// }