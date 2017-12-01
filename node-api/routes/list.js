var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var List = require('../models/list.js');
var User = require('../models/user.js');

router.post('/create', function(req, res) {
	var userMail = req.body.mail;
	var url = req.body.url;
	console.log(req.body);
	if (userMail) {
		// create user
		User.create({	userMail : req.body.mail }, function(err1,res1) {
			if (err1) res.send(err1);
			// create list
			List.create({ userId : res1.userId }, function(err2,res2) {
				if (err2) res.send(err2);

				// construct LINK for user
				url = url.replace("list_hash", res2.listLink);
				url = url.replace("user_hash", res1.userPwd);

				// send mail
				var transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {	user: 'whois2105@gmail.com', pass: 'Sniffing212' }
				});
				var mailOptions = {
					from: 'assignment.pro@gmail.com',
					to: userMail,
					subject: 'You just created an assignment list !',
					text: 'Here your link : ' + url,
					html:""
				};
				transporter.sendMail(mailOptions, function(error, info){
					if (error) {
						return res.json("mail failed...");
					} else {
						console.log('Email sent: ' + info.response);
						return res.json({"result" : "OK", "mail" : userMail, "url" : url});
					}
				});

			});
		});
	} else {
		return res.json("Pls, enter mail");
	}
});


module.exports = router;
