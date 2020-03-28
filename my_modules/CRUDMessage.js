// ___________________________________
// GET Message By Channel Id (test OK)
// ___________________________________
var getAllMessagesByChannelId = function(conn, channelId, callback){
    conn.query("SELECT * FROM Message WHERE Channel_id =" + channelId, 
    function (err, result, fields) {
        if (err) throw err;
        callback(result);
    });
}

// ___________________________________
// CREATE Message (test OK)
// ___________________________________
var createMessage = function(conn, channelId, userID, message, callback ){
    conn.query("INSERT INTO Message VALUES (NULL, "+ channelId + ",  " + userID + ", '" + message + "', '', '');", 
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



exports.getAllMessagesByChannelId = getAllMessagesByChannelId;
exports.createMessage = createMessage;
exports.deleteMessage = deleteMessage;
