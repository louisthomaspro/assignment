var express = require('express');
var router = express.Router();
var TaskModel = require('../models/task.js');


router.get('/:id?',function(req,res,next){
	if(req.params.id){
		TaskModel.getTaskById(req.params.id,function(err,rows){
			if(err)
			{
				res.json(err);
			}
			else{
				res.json(rows);
			}
		});
	}else{
		TaskModel.getAllTasks(function(err,rows){
			if(err)
			{
				res.json(err);
			}
			else
			{
				res.json(rows);
			}
		});
	}
});


router.post('/',function(req,res,next){
	TaskModel.addTask(req.body,function(err,count){
		if(err)
		{
			res.json(err);
		}
		else{
			res.json(req.body);//or return count for 1 &amp;amp;amp; 0
		}
	});
});


router.delete('/:id',function(req,res,next){
	TaskModel.deleteTask(req.params.id,function(err,count){
		if(err)
		{
			res.json(err);
		}
		else
		{
			res.json(count);
		}
	});
});


router.put('/:id',function(req,res,next){
	TaskModel.updateTask(req.params.id,req.body,function(err,rows){
		if(err)
		{
			res.json(err);
		}
		else
		{
			res.json(rows);
		}
	});
});

module.exports = router;