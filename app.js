var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 2016;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

var perangkatRoutes = require('./routes/perangkat');
var dataRoutes = require('./routes/data');
var batteryRoutes = require('./routes/battery');
var userRoutes = require('./routes/user');
var tdlRoutes = require('./routes/tdl');
var statusRoutes = require('./routes/status');
var safeRoutes = require('./routes/safe');

app.use(express.static(__dirname + '/public'));
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

// SOCKET
io.on('connection', function (socket) {

  socket.emit('cobapiton',{'status': 'sukses terhubung'});

  socket.on('cobapiton', function (data) {
    
    connection.acquire(function(err, con) {
      var creds = [data.status, data.port_perangkat];
      var query = 'update status_perangkat set status = ? where port_perangkat = ?';

      con.query(query, creds, function(err, result) {
        con.release();

        if (err) {
          // res.send({status: 1, message: 'Update failed'});
          console.log({status: 1, message: 'Update failed'});
          socket.broadcast.emit('cobapiton', {'port':data[0],'status':data[1]});
        } else {
          // res.send({status: 0, message: 'Update successfully'});
          console.log({status: 0, message: 'Update successfully'});
          socket.broadcast.emit('cobapiton', {'port':data[0],'status':data[1]});
        }
      });
    });

  });

});
