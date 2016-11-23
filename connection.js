var mysql = require('mysql');

function Connection() {
  this.pool = null;

  this.init = function() {
    this.pool = mysql.createPool({
      host: 'agungdp.agri.web.id',
      user: 'agungdp_iotpln',
      password: 'iotpln2016',
      database: 'agungdp_iotpln'
    });
  };

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}

module.exports = new Connection();
