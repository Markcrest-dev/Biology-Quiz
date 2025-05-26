// Simple Node.js Express backend for receiving quiz results and sending email (or saving to DB)

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configure your email transport (use your real credentials for production)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email provider
  auth: {
    user: 'your.email@gmail.com', // replace with your email
    pass: 'yourpassword' // replace with your email password or app password
  }
});

// Endpoint to receive quiz results
app.post('/api/quiz-result', (req, res) => {
  const { subject, difficulty, score, total, timestamp } = req.body;

  // Compose email
  const mailOptions = {
    from: 'your.email@gmail.com', // sender address
    to: 'destination.email@gmail.com', // receiver address
    subject: `Quiz Completed: ${subject} - ${difficulty} level`,
    text: `A user completed the ${subject} quiz at ${difficulty} level with a score of ${score}/${total} at ${timestamp}.`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, error: 'Failed to send email' });
    }
    res.json({ success: true, info });
  });
});

app.listen(PORT, () => {
  console.log(`Quiz backend server running on http://localhost:${PORT}`);
});
