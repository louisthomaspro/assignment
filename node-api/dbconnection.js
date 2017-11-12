var mysql=require('mysql');
var connection=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'',
	database:'assign'
});
module.exports=connection;
