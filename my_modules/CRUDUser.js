
// ___________________________________
// VERIFY USER BY Username 
// ___________________________________

// var verifyUserByUsername = function(conn, username, callback){
//     // TODO : resctifier la requet SQL ... ça fonctionne pas
//     console.log('exists query : ' + username);
//     conn.query("SELECT username FROM User WHERE EXISTS (SELECT username FROM User WHERE username = " + username +")", res =>{
        
//         callback(res);
//     })
// }



// ___________________________________
// GET USER BY ID (test OK)
// ___________________________________
var getUserById = function(conn, id, callback) {
    conn.query("SELECT * FROM User WHERE id=" + id, function (err, result, fields) {
        if (err) throw err;
            callback(result);
        });
}

// ___________________________________
// GET USER ALL USER (test OK)
// ___________________________________
var getAllUsers = function(conn, callback) {

    conn.query("SELECT * FROM User", function (err, result, fields) {
    if (err) throw err; 
        callback(result);
    });
}

// ___________________________________
// GET USER BY USERNAME (test OK)
// ___________________________________
var getUserByUsername = function(conn, username, callback){
    conn.query("SELECT username FROM User", (err, res) => {
        res.forEach(element => {
            if (element.username == username){
                conn.query("SELECT * FROM User WHERE username = '" + username + "'",
                    function (err, result, fields) {
                        if (err) throw err;
                        callback(result);
                    });
            } else {
                callback(false)
            }
        });
    })

    
}

// ___________________________________
// DELETE USER BY ID (test OK)
// ___________________________________
var deleteUser = function(conn, id, callback){
    var sql = "DELETE FROM User WHERE id ="+ id;
    conn.query(sql, function (err, result) {
    if (err) throw err;
    messageSuccess = "Number of records deleted: " + result.affectedRows;
    callback(messageSuccess);
});
}

// ___________________________________
// CREATE USER
// ___________________________________
var createUser = function(conn, username, password, bio='', avatar='', callback){
    var sql = "INSERT INTO user(username, password, bio, avatar) VALUES ('" +username+"','" +password+"', '" +bio+"', '" +avatar+"')";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        msgSuccess = username + " : inserted"
        callback(msgSuccess);
    });
}

// ___________________________________
// UPDATE USER BIO (test OK)
// ___________________________________
var updateUserBio = function (conn, id, bio, callback) {
    var sql = "UPDATE User SET bio = " + bio + " WHERE id = " + id;
    conn.query(sql, function (err, result) {
        if (err) throw err;
        msgSuccess = result.affectedRows + " record(s) updated";
        callback(msgSuccess);
});
}

// ___________________________________
// UPDATE USER AVATAR (test OK)
// ___________________________________
var updateUserAvatar = function(conn, id, avatar, callback){
    var sql = "UPDATE User Set avatar ="+avatar+"WHERE id =" + id;
    conn.query(sql, function (err, result) {
        if (err) throw err;
        msgSuccess = result.affectedRows + " record(s) updated";
        callback(msgSuccess);
    });
}

// exports.verifyUserByUsername = verifyUserByUsername;
exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.getUserByUsername = getUserByUsername;
exports.deleteUser = deleteUser;
exports.createUser = createUser;
exports.updateUserBio = updateUserBio;
exports.updateUserAvatar = updateUserAvatar;





