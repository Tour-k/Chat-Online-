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
  password: "root",
  multipleStatements: true
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
    });
    
    let previousId;
    const safeJoin = (currentId, username) => {
      socket.leave(previousId);
      socket.broadcast.to(previousId).emit('notificationOut', username );
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
    });

    // ___________________________________
    //récupération les messages d'un channel
    // ___________________________________
    socket.on("getRoom", data => {
      safeJoin(data[0], data[1]);
      socket.broadcast.to(data[0]).emit('notificationIn', data[1]);
      CRUDChannel.getChannelById(conn, data[0], res=>{
        res.forEach(element => {
          element.nom = unescape(element.nom);
        });
        socket.emit('room', res[0])
        // console.log( res[0] + " : en faisant un GET")
      });
      CRUDMessage.getAllMessagesByChannelId(conn, data[0], (res)=>{
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
      });
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
        console.log(res);
      });
      CRUDChannel.deleteChannel(conn, roomId, res=>{
        console.log(res);
      });
      CRUDChannel.getAllChannels(conn, function(res){
        res.forEach(element => {
          element.nom = unescape(element.nom);
        });
        rooms = res;
        io.emit("rooms", rooms);
      })
    });

    // ___________________________________
    //UPDATE a Channel
    // ___________________________________
    socket.on('updateRoom', data =>{
      console.log(data[1]);
      CRUDChannel.updateChannelName(conn, data[0], escape(String(data[1])), (res)=>{
        console.log(res);
      });
      CRUDChannel.getAllChannels(conn, function(res){
        res.forEach(element => {
          element.nom = unescape(element.nom);
        });
        rooms = res;
        io.emit("rooms", rooms);
      });

      safeJoin(data[0], data[1]);
      socket.broadcast.to(data[0]).emit('notificationIn', data[1]);
      CRUDChannel.getChannelById(conn, data[0], res=>{
        res.forEach(element => {
          element.nom = unescape(element.nom);
        });
        socket.emit('room', res[0])
        // console.log( res[0] + " : en faisant un GET")
      });
      CRUDMessage.getAllMessagesByChannelId(conn, data[0], (res)=>{
        res.forEach(element => {
          element.message = unescape(element.message);
        });
        // console.log(JSON.stringify(res));
        socket.emit("messages", res) 
      })
    });

    // ___________________________________
    // ADD message
    // ___________________________________
    socket.on("addMessage", dataArray => {
      CRUDMessage.createMessage(conn, dataArray[0], dataArray[1], escape(dataArray[2]), res=>{
        console.log(dataArray[2] + ' : message enregistré');
      });
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

      CRUDUser.getAllUsers(conn, (err, res) => {
          let dupEntry = false;
          if (err) {
          console.error(err);
          return
        }
        for(let i = 0; i < res.length; i++) {
          if(user.username === res[i].username) {
            socket.emit('errDupEntry',  true );
            dupEntry = true;
          }
        }
          if (!dupEntry) {
              bcrypt.hash(user.password, rounds, (err, hashPassword) => {
                  if (err) {
                      console.error(err);
                      return
                  }
                  CRUDUser.createUser(conn, String(user.username), String(hashPassword), String(user.bio), String(user.avatar), (resMessage, user, username) => {
                      console.log("res message : " + resMessage);
                      socket.emit('newUserBack', user);
                  })
              })

          }
      });

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
      console.log('in node username' + String(username));
      CRUDUser.getUserByUsername(conn, String(username), (res)=>{
        console.log('in node getUserId res : ' + res);
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