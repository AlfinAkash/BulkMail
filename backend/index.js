require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(cors());

// Configure Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/sendemail", async (req, res) => {
  try {
    const { msg, emailList } = req.body;

    for (const email of emailList) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "You got a Text Message from Your App!",
        text: msg,
      });
    }

    res.send(true);
  } catch (error) {
    console.error("Failed to send email:", error);
    res.send(false);
  }
});

app.listen(5000, () => {
  console.log("Server Started on port 5000");
});
