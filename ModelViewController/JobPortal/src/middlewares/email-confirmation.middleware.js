// Send confirmation emails after applying for a job using Nodemailer

import * as nodemailer from "nodemailer";

export const sendConfirmationEmail = (applicantEmail) => {
  // Create a Nodemailer transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fullstackdeveloperjourney@gmail.com",
      pass: "gnmqzzxwnxcaxnxh",
    },
  });

  // Email content
  const mailOptions = {
    from: "fullstackdeveloperjourney@gmail.com",
    to: applicantEmail,
    subject: "Job Application Confirmation",
    text: "Your job application has been confirmed by Nodemailer",
  };

  // Send the email
  try {
    const result = transporter.sendMail(mailOptions); // Returns a promise
    console.log("Email sent successfully");
  } catch (e) {
    console.log("Email send failed with error: " + e);
  }
};
