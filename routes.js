var todo = require('./models/todo');
var perangkat = require('./models/perangkat');

module.exports = {
  configure: function(app) {

    // TEST
    app.get('/todo', function(req, res) {
      todo.get(res);
    })

    app.post('/todo/', function(req, res) {
      todo.create(req.body, res);
    });

    app.put('/todo/', function(req, res) {
      todo.update(req.body, res);
    });

    app.delete('/todo/:id/', function(req, res) {
      todo.delete(req.params.id, res);
    });

  }
};
