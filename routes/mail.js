module.exports = mail;

var fs = require('fs');
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'hotmail',
	auth: {
	  user: 'ronniepiku1@hotmail.co.uk',
	  pass: process.env.EMAIL_PASSWORD,
	},
  });


function mail(to, subject, message, isHtml, callback) {
	if (Array.isArray(to)) {
		var i = 0;
		next();
		function next() {
			if (i < to.length) {
				mail(to[i], subject, message, isHtml, function(successful) {
					if (successful) {
						i++;
					}
					next();
				});
			}
			else {
				if (callback) {
					callback();
				}
			}
		}
	}
	else {
		var mailOptions = {
                from: 'ronniepiku1@hotmail.co.uk',
				to: to,
				subject: subject,
				text: message,
		};
		if (isHtml) {
			mailOptions.html = message;
		  } else {
			mailOptions.text = message;
		  }

		transporter.sendMail(mailOptions, function(error, info){
			var successful = true;
			if (error) {
				console.log(error);
				successful = false;
			}
			else {
				console.log('Message sent: ' + info.response);
			}
			if (callback) {
				callback(successful);
			}
		});
	}
}