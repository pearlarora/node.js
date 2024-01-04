// Sending emails in Node.js

// 1. Importing nodemailer
const nodemailer = require("nodemailer");

// 2. Configure and send email (Async operation - async/await is used)
async function sendMail() {
  // 1. Create an email transporter - email is sent t o the email server
  // Using Google server for SMTP (Simple Mail Transfer Protocol)
  // nodemailer.createTransport() gives the transporter instance used to send emails
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fullstackdeveloperjourney@gmail.com",
      pass: "gnmqzzxwnxcaxnxh",
      // This is not the password of the email id entered in user - app passwords in 2-step verification in gmail
    },
  });

  // 2. Configure email content
  const mailOptions = {
    from: "fullstackdeveloperjourney@gmail.com",
    to: "pearlarora2k1@gmail.com",
    subject: "Sending email in Node.js",
    text: "This email has been sent using nodemailer in node.js",
  };

  // 3. Send the email using this transporter - may throw an error
  try {
    const result = await transporter.sendMail(mailOptions); // Returns a promise
    console.log("Email sent successfully");
  } catch (e) {
    console.log("Email send failed with error: " + e);
  }
}

sendMail();
