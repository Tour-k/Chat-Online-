// ___________________________________
// GET USER BY ID
// ___________________________________
var getUserById = function(conn, id, callback) {
    conn.query("SELECT * FROM User WHERE id=" + id, function (err, result, fields) {
        if (err) throw err;
            callback(result);
        });
}

// ___________________________________
// GET USER ALL USER
// ___________________________________
var getAllUsers = function(conn, callback) {

    conn.query("SELECT * FROM User", function (err, result, fields) {
    if (err) throw err; 
        callback(result);
    });
}

// ___________________________________
// GET USER BY USERNAME
// ___________________________________
var getUserByUsername = function(conn, username, callback){
    console.log("test");
    conn.query("SELECT * FROM User WHERE username =" + username, 
    function (err, result, fields) {
        if (err) throw err;
        callback(result);
    });
}

//delete:
var deleteUser = function(conn, id){
    var sql = "DELETE FROM User WHERE id ="+ id;
    conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
});
}

// Insert a new User : 
var createUser = function(conn, username, password, bio='', avatar=''){
    var sql = "INSERT INTO User VALUES (NULL," + username + "," + password + "," + bio + ","+ avatar +")";
    conn.query(sql, function (err, result) {
    if (err) throw err;
        console.log( username + "inserted");   
}); 
}

//update: 
var updateUserBio = function (conn, id, bio) {
    var sql = "UPDATE User SET bio = " + bio + " WHERE id = " + id;
    conn.query(sql, function (err, result) {
        if (err) throw err;
        return result.affectedRows + " record(s) updated";
});
}

var updateUserAvatar = function(conn, id, avatar){
    var sql = "UPDATE User Set avatar ="+avatar+"WHERE id =" + id;
    conn.query(sql, function (err, result) {
        if (err) throw err;
        return result.affectedRows + " record(s) updated";
    });
}

exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.getUserByUsername = getUserByUsername;
exports.deleteUser = deleteUser;
exports.createUser = createUser;
exports.updateUserBio = updateUserBio;
exports.updateUserAvatar = updateUserAvatar;





