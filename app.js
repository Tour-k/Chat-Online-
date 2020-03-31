const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bcrypt = require('bcrypt');

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


    // ___________________________________
    // Récupérer les rooms à la connection 
    // ___________________________________
    CRUDChannel.getAllChannels(conn, (res)=>{
      io.emit("rooms", res);
    })
    
    let previousId;
    const safeJoin = currentId => {
      socket.leave(previousId);
      socket.join(currentId);
      console.log('joined to currenrId : '+currentId)
      previousId = currentId;
    };


    socket.on('getAllRooms', ()=>{
      CRUDChannel.getAllChannels(conn, (res)=>{
        res.forEach(element => {
          element.nom = unescape(element.nom);
        });
        io.emit("rooms", res);
        socket.emit('rooms', res);
      })
    })

    // ___________________________________
    //récupération les messages d'un channel
    // ___________________________________
    socket.on("getRoom", roomId => {
      safeJoin(roomId);
      CRUDChannel.getChannelById(conn, roomId, res=>{
        res.forEach(element => {
          element.nom = unescape(element.nom);
        });
        socket.emit('room', res[0])
        // console.log( res[0] + " : en faisant un GET")
      })
      CRUDMessage.getAllMessagesByChannelId(conn, roomId, (res)=>{
        res.forEach(element => {
          element.message = unescape(element.message);
        });
        // console.log(JSON.stringify(res));
        socket.emit("messages", res) // initiating client only
        // console.log( res + ': messages !!')
      })   
    });

    // ___________________________________
    //ajouter d'un channel
    // ___________________________________
    socket.on("addRoom", room => {
      // safeJoin(room.id);
      CRUDChannel.createChannel(conn, escape(String(room.nom)), parseInt(room.userId), function(res){
        console.log(res)
      })
      // CRUDChannel.getChannelById(conn, room.id, res=>{
      //   console.log('GET :' + room.id);
      //   socket.emit('room', res); // emitting back to client
      // }) 

      CRUDChannel.getAllChannels(conn, function(res){
        res.forEach(element => {
          element.nom = unescape(element.nom);
        });
        rooms = res;
       
        io.emit("rooms", rooms); // emitting broadcast 

      })
      
    });

    // ___________________________________
    //DELETE a Channel
    // ___________________________________
    socket.on('deleteRoom', roomId =>{
      CRUDMessage.deleteAllMessageByChannelId(conn, roomId, res=>{
        console.log(res)
      })
      CRUDChannel.deleteChannel(conn, roomId, res=>{
        console.log(res);
      })
      CRUDChannel.getAllChannels(conn, function(res){
        res.forEach(element => {
          element.nom = unescape(element.nom);
        });
        rooms = res;
        io.emit("rooms", rooms);
      })
    });

    // ___________________________________
    // ADD message
    // ___________________________________
    socket.on("addMessage", dataArray => {
      CRUDMessage.createMessage(conn, dataArray[0], dataArray[1], escape(dataArray[2]), res=>{
        console.log(dataArray[2] + ' : message enregistré');
      })
      CRUDMessage.getAllMessagesByChannelId(conn, dataArray[0], (res)=>{
        res.forEach(element => {
          element.message = unescape(element.message);
        });
        socket.emit("messages", res);
        io.to(dataArray[0]).emit('messages', res);

        
        console.log( res + ': messages !!')
      })
    });

    


    // Creer un utilisateur
    socket.on('newUser', user => {
      const rounds = 8;

      bcrypt.hash(user.password, rounds, (err, hashPassword) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(hashPassword);
        CRUDUser.createUser(conn, String(user.username), String(hashPassword), String (user.bio), String (user.avatar), function(res) {
          console.log(res)
        })
      })
    });

    // Recuperer un utilisateur
    socket.on('getUser', user => {
      CRUDUser.getUserByUsername(conn, String(user.username),  (res) => {
        if(res){
          bcrypt.compare(user.password, res[0].password, (err, result) => {
            if(err) throw err ;
            
            if(result){
              socket.emit('user', res[0]);
            }
            socket.emit("testLoginRes", result) //true or false  
          })
        }
      })
    });

    socket.on('getUserId', username => {
      console.log(username);
      CRUDUser.getUserByUsername(conn, String(username), (res)=>{
        socket.emit('user', res[0]);
      })
    }) 

  });

  

    

  // ___________________________________
  // retour connexion Socket
  // ___________________________________
  http.listen(8988, function(){
      console.log('listening on *:8988');
  });


});