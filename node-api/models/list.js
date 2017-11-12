var db=require('../dbconnection');

const crypto = require('crypto');

exports.create = function(req, callback){
	var userId = req.userId;
	// insert
	db.query("INSERT INTO list (id_admin) VALUES (?)", [userId], function (err1, res1, fields) {
    if (err1) throw err1;
		var listId = res1.insertId;
		// get salt
		db.query("SELECT value FROM parameters WHERE name='list_salt'", function (err2, res2, fields) {
			if (err2) throw err2;
			var salt = res2[0].value;
			var sha256 = crypto.createHash('sha256').update(listId + salt).digest("hex");
			// set password
			db.query("UPDATE list SET link=? WHERE id='?'", [sha256, listId], function (err3, res3, fields) {
				if (err3) throw err3;
			 	callback(null,{userId : userId, listId : listId, listLink : sha256 });
			});
		});
	});
};
