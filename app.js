var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection');
var app = express();

var perangkatRoutes = require('./routes/perangkat');
var dataRoutes = require('./routes/data');
var batteryRoutes = require('./routes/battery');
var userRoutes = require('./routes/user');
var tdlRoutes = require('./routes/tdl');
var statusRoutes = require('./routes/status');
var safeRoutes = require('./routes/safe');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

connection.init();

// ROUTES
perangkatRoutes.configure(app);
dataRoutes.configure(app);
batteryRoutes.configure(app);
userRoutes.configure(app);
tdlRoutes.configure(app);
statusRoutes.configure(app);
safeRoutes.configure(app);

var server = app.listen(2016, function() {
  console.log('Server listening on port ' + server.address().port);
});
