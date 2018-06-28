var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('../db/mongoose');
var {Todo} = require('../models/todo');
var {User} = require('../models/user');

var app = express();

app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.send(e);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.send(e);
	});
});

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;

	// is valid; no 404
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findById(id).then((todo) => {
		if(!todo) {
			return res.status(404).send();
		}
		res.status(200).send({todo});
	}).catch((e) => res.status(404).send());
});

app.post('/delete/:id', (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findOneAndDelete({_id: id}).then((doc) => {
		res.send({doc});
	}, (e) => res.send(e));
});

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};