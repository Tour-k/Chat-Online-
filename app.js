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
  console.log("Connected to database !");
  CRUDUser.getAllUsers(conn, function(result){
    stuffIWant = result;
    console.log(stuffIWant)
    
    } 
  );  
});


//Socket.io
io.on("connection", socket => {
  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on("getChannel", channelId => {
    safeJoin(channelId);
    socket.emit("message", 'test messages');
  });

});





http.listen(8988, function(){
    console.log('listening on *:8988');
});
