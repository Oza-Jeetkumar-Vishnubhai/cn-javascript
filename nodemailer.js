"use strict";
const nodemailer = require("nodemailer");

async function main() {

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "onlyjeet31@gmail.com", // generated ethereal user
      pass: "njrgoycvnsjaoxrx", // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: "onlyjeet31@gmail.com", // sender address
    to: "nirdeshijotangia@gmail.com", // list of receivers
    subject: "Sasta mail", // Subject line
    text: "Hello", // plain text body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main()
// setInterval(main,1000);
// setTimeout(main, 1000);