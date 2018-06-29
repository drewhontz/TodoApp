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
					.toBe('ValidatorError')
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

describe('DELETE /delete/:id', () => {
	it('should delete by obj id', (done) => {
		var deleteId = todos[0]._id.toHexString();

		request(app)
			.delete(`/todos/${deleteId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id == todos[0]._id.toHexString());
			})
			.end(done);
	});

	it('should return not valid id', (done) => {
		var deleteId = '123';

		request(app)
			.delete(`/todos/${deleteId}`)
			.expect(404)
			.expect((res) => {
				expect(res.body.error).toBe('That id is invalid!');
			})
			.end(done);
	});

	it('should return error message for now result', (done) => {
		var deleteId = '5b34f0af0bd065348c00b631';

		request(app)
			.delete(`/todos/${deleteId}`)
			.expect(404)
			.expect((res) => {
				expect(res.body.error).toBe('That id is not in the collection!');
			})
			.end(done);
	});
});

describe('PATH /todo:id', () => {
	it('should update the todo', (done) => {
		var id = todos[0]._id.toHexString();
		var text = 'Lady bird';

		request(app)
			.patch(`/todos/${id}`)
			.send({text: text, completed: true})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(true);
				expect(typeof res.body.todo.completedAt).toBe('number');
			})
			.end(done);
	});

	it('should not update the todo', (done) => {
		var id = todos[0]._id.toHexString();
		var text = 'The shape of water';

		request(app)
			.patch(`/todos/${id}`)
			.send({text: text, completed: false})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.completedAt).toBeNull();
			})
			.end(done);
	});
});
