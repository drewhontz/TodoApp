const expect = require('expect');
const request = require('supertest');

const {app} = require('../server/server');
const {Todo} = require('../models/todo');
const {ObjectID} = require('mongodb');

const todos = [{
	_id: ObjectID(),
	text: 'First text todo'
}, {
	_id: ObjectID(),
	text: 'Second text todo'
}];

beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
});


describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Test todo text';

		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find().then((todos) => {
					expect(todos.length).toBe(3);
					expect(todos[2].text).toBe(text);
					done();
				}).catch((e) => done(e));
			});
	});

	it('should create an invalid todo w/ empty text', (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect((res) => {
				expect(res.body.errors.text.name)
					.toBe("ValidatorError")
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					done();
				}).catch((e) => done(e));
			});
	});
});

describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					done();
				}).catch((e) => done(e));
			});
	});

	it('should get todo with a valid id, and result.', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it('should get todo with and invalid id', (done) => {
		request(app)
			.get(`/todos/123`)
			.expect(404)
			.end(done);
	});

	it('should get todo with a valid id, but no results', (done) => {
		var hexId = ObjectID().toHexString();

		request(app)
			.get(`/todos/${hexId}`)
			.expect(404)
			.end(done);
	});
});

describe('POST /delete/:id', () => {
	it('should delete by obj id', (done) => {
		request(app)
			.post('/delete/')
			.send({id: todos[0]._id.toHexString()})
			.expect(200)
			.expect()
	});
});
