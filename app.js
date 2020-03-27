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
  password: "password"
});
 
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  CRUDUser.getAllUsers(conn, function(result){
    stuffIWant = result;
    console.log(stuffIWant[0])
    } 
  );  
});


// Socket.io
// io.on('connection', function(socket){
//     console.log('a user connected');
//   });


// http.listen(3000, function(){
//     console.log('listening on *:3000');
// });
