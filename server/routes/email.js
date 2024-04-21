require("dotenv").config();
const express = require("express");
const route = express.Router();
const nodemailer = require("nodemailer");

route.post("/send-mail", async (req, res) => {
  console.log("sending");
  try {
    const { name, company, number, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILEREMAIL,
        pass: process.env.NODEMAILERPASS,
      },
    });

    let mailOptions = {
      from: process.env.NODEMAILEREMAIL,
      to: process.env.NODEMAILER_RECIEVER,
      subject: "New Portfolio Contact Request",
      text: `You have received a new message from:
             Name: ${name}
             Company: ${company}
             Contact Number: ${number}
             Email: ${email}
             Message: ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.send("Email sent successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in sending email");
  }
});

module.exports = route;
