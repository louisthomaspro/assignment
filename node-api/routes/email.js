var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

router.get('/:value?',function(req,res,next){
	if(req.params.value){
		res.json(req.body);
	} else {
		var transporter = nodemailer.createTransport({
		  service: 'gmail',
		  auth: {
		    user: 'whois2105@gmail.com',
		    pass: 'Sniffing212'
		  }
		});

		var mailOptions = {
		  from: 'assignment.pro@gmail.com',
		  to: 'louisthomas.pro@gmail.com',
		  subject: 'You just created an assignment list !',
		  text: 'Here your link : qsdqqsdqsdqsddsqdqsd.fqsfqsfqsf',
			// HTML body
    	html:""
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log(error);
				res.json(error);
		  } else {
		    console.log('Email sent: ' + info.response);
				res.json({"a" : info.response, "b" : "Sent !", "c" : req.body});
		  }
		});


	}
});


module.exports = router;
