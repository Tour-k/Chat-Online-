  
  //-----------------------
  // CRUD USER
  //------------------------
  id = 4;
    avatar="'path/image2'";
   CRUDUser.updateUserBio(conn, id, avatar, function(result){
     msgSuccess = result;
     console.log(msgSuccess);
   }); 
  
  
     id = 4;
       bio="'bio non bio'";
      CRUDUser.updateUserBio(conn, id, bio, function(result){
        msgSuccess = result;
        console.log(msgSuccess);
      });
  
  
  
   username = "'test1'";
   password = "'ChocoBisous'";
   bio= "'Petite bio sans pesticide'";
   avatar="'path/images'";
  CRUDUser.createUser(conn, username, password, bio, avatar,function(result){
      msgSuccess = result;
        console.log(msgSuccess);
      });
  
  
    id = 1;
     CRUDUser.deleteUser(conn, id, function(result){
       msgSuccess = result;
       console.log(msgSuccess);
     });


   username = "'Username6'";
    CRUDUser.getUserByUsername(conn, username, function(result){
      user = result;
      console.log(user);
    });


   CRUDUser.getUserById(conn, 1, function(result){
     user = result;
     console.log(user);
   });


   CRUDUser.getAllUsers(conn, function(result){
     users = result;
     console.log(users); 
     } 
   );  

   //-------------------------
   // CRUD Channel
   //---------------------------

   channelName = "'test1Channel2'";
   userId = 5;
  CRUDChannel.createChannel(conn, channelName, userId,function(result){
      msgSuccess = result;
        console.log(msgSuccess);
      });
 

   CRUDChannel.getAllChannels(conn, function(result){
     channels = result;
     console.log(channels); 
     } 
   );  

   CRUDChannel.getChannelById(conn, 1, function(result){
    channel = result;
    console.log(channel);
  });

  CRUDChannel.getAllChannelsByOwnerId(conn, 4, function(result){
    channels = result;
    console.log(channels);
  });

  id = 1;
  CRUDChannel.deleteChannel(conn, id, function(result){
    msgSuccess = result;
    console.log(msgSuccess);
  });

  id = 2;
  channelName="'New Channel name'";
 CRUDChannel.updateChannelName(conn, id, channelName, function(result){
   msgSuccess = result;
   console.log(msgSuccess);
 });