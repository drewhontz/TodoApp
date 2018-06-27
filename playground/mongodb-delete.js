const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB');
	}
	console.log('Connected to MongoDB');

	var dbo = db.db('TodoApp');
	var todoCollection = dbo.collection('Todos');

	// // delete many
	// todoCollection.deleteMany({text: 'Eat lunch'}).then((result) => {
	// 	console.log(result);
	// });

	// // delete one; deletes first instance
	// todoCollection.deleteOne({text: 'Eat lunch'}).then((result) => {
	// 	console.log(result);
	// });

	// find one and delete
	todoCollection.findOneAndDelete({text: 'Eat lunch'}).then((result) => {
		console.log(result);
	});

	db.close();
});