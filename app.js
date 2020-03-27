const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var CRUDUser = require('./my_modules/CRUDUser');
var CRUDChannel = require('./my_modules/CRUDChannel');



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

//   CRUDUser.getAllUsers(conn, function(result){
//     stuffIWant = result;
//     // console.log(stuffIWant)
    
//     } 
//   );  
//
});


var rooms = []; //logique sans BDD, à remplacer 

//Socket.io
//Connexion... pour l'instant c'est un à la fois, et on se déconnecte des qu'on passe sur
io.on("connection", socket => {
  
  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    console.log('joined to currenrId : '+currentId)
    previousId = currentId;
  };

  //récupération d'un channel 
  socket.on("getRoom", roomId => {
    safeJoin(roomId);
    socket.emit("room", rooms[roomId]);  // initiating client only
  });

  //ajouter d'un channel
  socket.on("addRoom", room => {
    //logique bidon à remplacer avec mysql
    console.log(room)
    rooms.push(room);
    safeJoin(room.id);
    // io.emit("rooms", rooms);  // emitting broadcast 
    // socket.emit("room", room); // emitting back to client
  });

  //Envoyer un message
  socket.on("message", msg => {
    rooms[msg.id] = msg;
    socket.to(msg.id).emit("rooms", msg); // emit to only the clients that are currently viewing that document
  });

  // Récupérer les rooms
  io.emit("rooms", rooms);
});





http.listen(8988, function(){
    console.log('listening on *:8988');
});
