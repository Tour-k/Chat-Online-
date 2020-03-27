// ___________________________________
// GET CHANNEL BY ID (test OK) 
// ___________________________________
var getChannelById = function(conn, id, callback) {
    conn.query("SELECT * FROM Channel WHERE id=" + id, function (err, result, fields) {
        if (err) throw err;
            callback(result);
        });
}

// ___________________________________
// GET ALL CHANNELS (test OK) 
// ___________________________________
var getAllChannels = function(conn, callback) {

    conn.query("SELECT * FROM Channel", function (err, result, fields) {
    if (err) throw err; 
        callback(result);
    });
}

// ___________________________________
// GET CHANNEL BY OWNER ID (test OK)
// ___________________________________
var getAllChannelsByOwnerId = function(conn, userId, callback){
    conn.query("SELECT * FROM Channel WHERE User_id =" + userId, 
    function (err, result, fields) {
        if (err) throw err;
        callback(result);
    });
}

// ___________________________________
// DELETE CHANNEL BY ID (test OK)
// ___________________________________
var deleteChannel = function(conn, id, callback){
    var sql = "DELETE FROM Channel WHERE id ="+ id;
    conn.query(sql, function (err, result) {
    if (err) throw err;
    messageSuccess = "Number of records deleted: " + result.affectedRows;
    callback(messageSuccess);
});
}

// ___________________________________
// CREATE CHANNEL (test OK)
// ___________________________________
var createChannel = function(conn, ChannelName, userId, callback){
    var sql = "INSERT INTO Channel VALUES (NULL, '" + ChannelName + "', " + userId +")";
    conn.query(sql, function (err, result) {
    if (err) throw err;
        msgSuccess = ChannelName + " inserted"
        callback(msgSuccess);   
}); 
}

// ___________________________________
// UPDATE CHANNEL NAME (test OK)
// ___________________________________
var updateChannelName = function (conn, id, channelName, callback) {
    var sql = "UPDATE Channel SET nom = " + channelName + " WHERE id = " + id;
    conn.query(sql, function (err, result) {
        if (err) throw err;
        msgSuccess = result.affectedRows + " record(s) updated";
        callback(msgSuccess);
});
}

exports.getChannelById = getChannelById;
exports.getAllChannels = getAllChannels;
exports.getAllChannelsByOwnerId = getAllChannelsByOwnerId;
exports.deleteChannel = deleteChannel;
exports.createChannel = createChannel;
exports.updateChannelName = updateChannelName;
