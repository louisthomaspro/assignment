var db = require('../dbconnection');

const crypto = require('crypto');

exports.create = function(req, callback) {
	var userMail = req.userMail;
	// insert
	db.query("INSERT INTO user (mail) VALUES (?)", [userMail], function (err1, res1, fields) {
    if (err1) throw err1;
		var userId = res1.insertId;
		// get salt
		db.query("SELECT value FROM parameters WHERE name='user_salt'", function (err2, res2, fields) {
	    if (err2) throw err2;
			var salt = res2[0].value;
			var sha256 = crypto.createHash('sha256').update(userId + salt).digest("hex");
			// set password
			db.query("UPDATE user SET pwd=? WHERE id='?'", [sha256, userId], function (err3, res3, fields) {
		    if (err3) throw err3;
				callback(null, {userId : userId, userPwd : sha256 } );
			});
		});
	});
};
