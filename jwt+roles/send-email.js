var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hotelcasestudy@gmail.com',
    pass: 'casestudy2021'
  }
});

var mailOptions = {
  from: 'hotelcasestudy@gmail.com',
  to: 'shivamttl@gmail.com',
  subject: 'Sending Email using Node.js',
  text: `sent from nodejs.`
  // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
