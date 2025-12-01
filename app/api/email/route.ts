import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (request: Request) => {
  try {
    const { name, company, number, email, message } = await request.json();

    if (!name || !company || !number || !email || !message) {
      return new NextResponse("Please fill in all fields", { status: 400 });
    }

    const user = process.env.NODEMAILEREMAIL;
    const pass = process.env.NODEMAILERPASS;

    if (!user || !pass) {
      return new NextResponse("Issue with gmail", { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user,
        pass: pass,
      },
    });

    const mailOptions = {
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
    return new NextResponse("Email sent successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error in sending email", { status: 500 });
  }
};
