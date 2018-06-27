const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB');
	}
	console.log('Connected to MongoDB');

	var dbo = db.db('TodoApp');
	var usersCollection = dbo.collection('Users');

	// update one
	var userObj = {name: 'Drew', age: 25};
	usersCollection.insertOne(userObj).then((doc)=>{
		console.log('Inserting user:', userObj);
	});

	var userUpdate = {$set: {name: 'Andrew'}, $inc: { age: 1}};
	usersCollection.updateOne({name: 'Drew'},userUpdate).then((doc)=>{
		console.log(doc);
	});

	db.close();
});