// ___________________________________
// GET All Message By Channel Id (test OK)
// ___________________________________
var getAllMessagesByChannelId = function(conn, channelId, callback){
    conn.query("SELECT Message.id, Message.message, Message.updateat, Message.User_id ,User.username FROM Message INNER JOIN User ON Message.User_id = User.id WHERE Channel_id =" + channelId ,
    function (err, result, fields) {
        if (err) throw err;
        callback(result);
    });
}

// ___________________________________
// DELETE All Message By Channel Id  (test Ok)
// ___________________________________
var deleteAllMessageByChannelId = function(conn, channelId, callback){
    var sql = "DELETE FROM Message WHERE Channel_id ="+ channelId;
    conn.query(sql, function (err, result) {
    if (err) throw err;
    messageSuccess = "Tous les messages du channel ont été supprimé !";
    console.log(messageSuccess);
    callback(result);
});
}

// ___________________________________
// CREATE Message (test OK)
// ___________________________________
var createMessage = function(conn, channelId, userID, message, callback ){
    conn.query("INSERT INTO Message VALUES (NULL, "+ channelId + ",  " + userID + ", '" + message + "', '', "+ String(Date.now())+");", 
        (err, result) =>{
            if (err) throw err;
            callback('Nouveau message enregistré dans la BDD !!')
        });
}
    
// ___________________________________
// DELETE Message (test OK)
// ___________________________________
var deleteMessage = function(conn, id, callback){
    var sql = "DELETE FROM Message WHERE id ="+ id;
    conn.query(sql, function (err, result) {
    if (err) throw err;
    messageSuccess = "Number of records deleted: " + result.affectedRows;
    callback(messageSuccess);
});
}

// TODO : CRUD UPDATE message
var updateMessage = function(conn , id , msg, callback){
    var sql = "UPDATE Message SET message = '" + msg + "' WHERE id = " + id; 
    conn.query(sql, (err, res)=>{
        if (err) throw err;
        message = 'Number of records update :' + res.affectedRows;
        callback(message);
    })
}



exports.getAllMessagesByChannelId = getAllMessagesByChannelId;
exports.deleteAllMessageByChannelId = deleteAllMessageByChannelId;
exports.createMessage = createMessage;
exports.deleteMessage = deleteMessage;
exports.updateMessage = updateMessage;
