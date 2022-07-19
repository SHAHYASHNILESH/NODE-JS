"use strict";
const nodemailer = require("nodemailer");

module.exports.sendMail=async function sendMail(str,data) {

  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "yashshah2046@gmail.com", // generated ethereal user
      pass: "aihxmtyhxkghxsbp", // generated ethereal password
    },
  });

  var Ohtml,OSubject,Otext;
  if(str=='signup'){
    OSubject=`Thank you for signing ${data.name}`;
    Ohtml=`
    <h1>Welcome to FoodApp.com</h1>
    Hope you have a good time!
    Here are your results-
    Name-${data.name}
    Email-${data.email}
    `
  }
  else if(str=='resetpassword'){
    OSubject='Reset Password';
    Ohtml=`
    <h1>FoodApp.com</h1>
    Here is your link to reset your password!
    ${data.resetPasswordLink}
    `
  }

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"FoodApp 👻" <yashshah2046@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: OSubject, // Subject line
    //text: "Hello world?", // plain text body
    html:Ohtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
 
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

