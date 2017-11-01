var express = require('express');
var router = express.Router();

var munkres = require('munkres-js');

router.get('/',function(req,res,next){

	var tab1 = [
		[9,6,7,3,4],
		[2,1,9,1,8],
		[4,3,2,2,7],
		[9,1,8,8,3],
		[1,7,8,9,5],
	];
	
	var tab2 = [
		[1,4,3,7,6],
		[8,9,1,9,2],
		[6,7,8,8,3],
		[1,9,2,2,7],
		[9,3,2,1,5],
	];
	
	var r = munkres(tab2);

	
	res.json(r);
});

module.exports = router;