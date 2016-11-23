var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection');
var routes = require('./routes');
var jwt = require('jsonwebtoken');
var app = express();

// CORS middleware
// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//
//     var token = req.headers['authorization'];
//
//     if (!token){
//       res.send({status: false, message: 'No token provided'})
//     }
//     else {
//       jwt.verify(token, 'yangPentingPanjang', function(err, decoded) {
//         if (err){
//           res.send({status: false, message: 'Token authorization failed'});
//         }
//         else {
//           var decoded = jwt.verify(token, 'yangPentingPanjang');
//           var nim = decoded.nim;
//           var username = decoded.username;
//
//           exports.decoded = decoded;
//           next();
//         }
//       });
//     }
//
// }

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
// app.use(allowCrossDomain);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

connection.init();
routes.configure(app);

var server = app.listen(2016, function() {
  console.log('Server listening on port ' + server.address().port);
});
