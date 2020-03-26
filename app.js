const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// ___________________________________
// CONNEXION A LA BASE DE DONNEE
// ___________________________________

var mysql = require('mysql');
 
console.log('Get connection ...');
 
var conn = mysql.createConnection({
  database: 'mydb',
  host: "localhost",
  user: "root",
  password: "root"
});
 
conn.connect(function(err) {
 if (err) throw err;
 console.log("Connected!");

  // Select All from User : 
    conn.query("SELECT * FROM User", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });


// Select by Id from User : 
conn.query("SELECT * FROM User WHERE id= 1", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    });

    // Select by username from User : 
conn.query("SELECT * FROM User WHERE username = 'Username6'", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    });

  // Insert a new User : 
  var sql = "INSERT INTO User VALUES (NULL,'Username7', 'pass', 'testbio', 'testpathavatar')";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");   
  }); 

  //delete:
  var sql = "DELETE FROM User WHERE username = 'Username5'";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });

  //update: 
  var sql = "UPDATE User SET bio = 'bio updated' WHERE id = 1 ";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});





// TODO : CRUD 







// Socket.io
// io.on('connection', function(socket){
//     console.log('a user connected');
//   });


// http.listen(3000, function(){
//     console.log('listening on *:3000');
// });
