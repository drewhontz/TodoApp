const {mongoose} = require('../db/mongoose');
const {Todo} = require('../models/Todo');
const {User} = require('../models/User');

var id = '5b3244da9b50c72f10af0c00';
var userId = '5b2e5a950b3e67045c3d5aaf';

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	if (todos.length == 0){
// 		return console.log('ID not found');
// 	}
// 	console.log('Todos', todos);
// });

Todo.findById(id).then((todo) => {
	if (!todo) {
		return console.log('Id not found');
	}
	console.log('Todo By Id', todo);
}).catch((e) => console.log(e));

// Challenge
User.findById(userId).then((user) => {
	if(!user) {
		return console.log('No user at that id');
	}
	console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));
