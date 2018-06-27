const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB');
	}
	console.log('Connected to MongoDB');

	var dbo = db.db('TodoApp');
	var todoCollection = dbo.collection('Todos');

	// update one
	todoCollection.findOneAndUpdate({
		_id: new ObjectID('5b2cfed6aad5c1ab1c32b986')
	}, {
		$set: {
			completed: true,
			text: 'Eat brunch, dude'
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

	db.close();
});