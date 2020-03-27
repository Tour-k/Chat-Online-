// ___________________________________
// GET Message By Channel Id
// ___________________________________
var getAllMessagesByChannelId = function(conn, channelId, callback){
    conn.query("SELECT * FROM Messages WHERE Channel_id =" + channelId, 
    function (err, result, fields) {
        if (err) throw err;
        callback(result);
    });
}