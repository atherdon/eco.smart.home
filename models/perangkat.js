var connection = require('../connection');

function Perangkat() {

  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from perangkat', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

}

module.exports = new Perangkat();
