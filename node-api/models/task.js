var db=require('../dbconnection');


exports.getAllTasks = function(callback){
	return db.query("Select * from task",callback);
};

exports.getTaskById = function(id,callback){
	return db.query("select * from task where Id=?",[id],callback);
};

exports.addTask = function(Task,callback){
	return db.query("Insert into task values(?,?,?)",[Task.Id,Task.Title,Task.Status],callback);
};

exports.deleteTask = function(id,callback){
	return db.query("delete from task where Id=?",[id],callback);
};

exports.updateTask = function(id,Task,callback){
	return db.query("update task set Title=?,Status=? where Id=?",[Task.Title,Task.Status,id],callback);
};
