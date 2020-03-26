const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var CRUDUser = require('./my_modules/CRUDUser');



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
var User = '';
console.log(CRUDUser.getAllUsers(conn));  
});


// Socket.io
// io.on('connection', function(socket){
//     console.log('a user connected');
//   });


// http.listen(3000, function(){
//     console.log('listening on *:3000');
// });
