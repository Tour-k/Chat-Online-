const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var CRUDUser = require('./my_modules/CRUDUser');
var CRUDChannel = require('./my_modules/CRUDChannel');
var CRUDMessage = require('./my_modules/CRUDMessage');



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


  // ___________________________________
  //Socket.io
  // ___________________________________
  io.on("connection", socket => {
    
    let previousId;
    const safeJoin = currentId => {
      socket.leave(previousId);
      socket.join(currentId);
      console.log('joined to currenrId : '+currentId)
      previousId = currentId;
    };

    // ___________________________________
    //récupération les messages d'un channel
    // ___________________________________
    socket.on("getRoom", roomId => {
      safeJoin(roomId);
      CRUDMessage.getAllMessagesByChannelId(conn, roomId, (res)=>{
        socket.emit("messages", res); // initiating client only
        console.log(res);
      })   
    });

    // ___________________________________
    //ajouter d'un channel
    // ___________________________________
    socket.on("addRoom", room => {
      CRUDChannel.createChannel(conn, String(room.name), parseInt(room.userId), function(res){
        console.log(res)
      })
      safeJoin(room.id);
      CRUDChannel.getAllChannels(conn, function(res){
        rooms = res;
        io.emit("rooms", rooms); // emitting broadcast 
      })
      socket.emit("room", room); // emitting back to client
    });

    // ___________________________________
    //DELETE a Channel
    // ___________________________________
    socket.on('deleteRoom', roomId =>{
      CRUDChannel.deleteChannel(conn, roomId, res=>{
        console.log(res);
      })
      CRUDChannel.getAllChannels(conn, function(res){
        rooms = res;
        io.emit("rooms", rooms);
    })
  });

  
    //Envoyer un message
    socket.on("message", msg => {
      rooms[msg.id] = msg;
      socket.to(msg.id).emit("rooms", msg); // emit to only the clients that are currently viewing that document
    });

    // ___________________________________
    // Récupérer les rooms à la connection 
    // ___________________________________
    CRUDChannel.getAllChannels(conn, (res)=>{
      io.emit("rooms", res);
    })
    

  });

  // ___________________________________
  // retour connexion Socket
  // ___________________________________
  http.listen(8988, function(){
      console.log('listening on *:8988');
  });


});