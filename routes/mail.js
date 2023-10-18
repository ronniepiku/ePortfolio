const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'ronniepiku1@hotmail.co.uk',
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post('/mail', (req, res) => {
  const from = req.body.email;
  const subject = req.body.subject || 'Contact Form Submission';
  const message = `Name: ${req.body.name}\nPhone: ${req.body.phone}\nMessage: ${req.body.message}`;

  const mailOptions = {
    from: from,
    to: 'ronniepiku1@hotmail.co.uk',
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Message not sent. Please try again later.' });
    } else {
      console.log('Message sent: ' + info.response);
      res.status(200).json({ success: true, message: 'Message sent successfully.' });
    }
  });
});

module.exports = router;