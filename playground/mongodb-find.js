const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB');
	}
	console.log('Connected to MongoDB');

	var dbo = db.db('TodoApp');
	var todoCollection = dbo.collection('Todos');
	var usersCollection = dbo.collection('Users');

	todoCollection.find({completed: false}).count().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs));
	}, (err) => {
		console.log("Unable to find results", err);
	});

	usersCollection.find({name: 'Drew'}).toArray().then((docs) => {
		if (docs.length == 0) {
			console.log('User not found');
		} else {
			console.log('User found');
			console.log(JSON.stringify(docs));			
		}
	}, (err) => {
		console.log('Unable to query Users collection');
	});
	db.close();
});
