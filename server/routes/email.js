const express = require("express");
const route = express.Router();
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASSWORD,
  },
});

route.post("/send-mail", (req, res) => {
  const { name, company, number, email, message } = req.body;

  console.log(req.body);

  let mailOptions = {
    from: process.env.EMAIL,
    to: "onlymuza@gmail.com",
    subject: "New Portfolio Contact Request",
    text: `You have received a new message from:
           Name: ${name}
           Company: ${company}
           Contact Number: ${number}
           Email: ${email}
           Message: ${message}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully");
    }
  });
});

module.exports = route;
