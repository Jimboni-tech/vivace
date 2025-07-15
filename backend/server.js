// Filename: server.js (for your local backend)

// Load environment variables from .env file (for local development)
require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the CORS middleware
const app = express();

// Use a distinct port for the backend to avoid conflict with React's default 3000
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS for your frontend
// IMPORTANT: In production, replace '*' with your actual frontend domain (e.g., 'https://your-frontend-domain.com')
app.use(cors({
  origin: 'https://vivaceapp.com' // Allow requests from your React frontend
}));

// Define your email sending endpoint
app.post('/api/send-thank-you-email', async (req, res) => {
  const { recipientEmail } = req.body;

  // Basic validation
  if (!recipientEmail || typeof recipientEmail !== 'string' || !recipientEmail.includes('@')) {
    return res.status(400).json({ error: 'Invalid recipient email provided.' });
  }

  // --- Configure your email transporter for Gmail ---
  // IMPORTANT: These values will come from your .env file locally.
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST ,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: process.env.EMAIL_SECURE === 'true' || false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // --- Define the email content ---
  const mailOptions = {
    from: `Vivace App <${process.env.SENDER_EMAIL_ADDRESS}>`,
    to: recipientEmail,
    subject: 'Thanks for Joining the Quest!',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #0056b3;">Welcome to the Quest!</h2>
        <p>Dear ${recipientEmail},</p>
        <p>Thank you for signing up for early access to Vivace.</p>
        <p>We're thrilled to have you on board and will notify you as soon as the quest begins!</p>
        <p>In the meantime, feel free to follow us on social media for updates.</p>
        <p>Best regards,</p>
        <p>The Vivace Team</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 0.8em; color: #777;">This is an automated email, please do not reply.</p>
      </div>
    `,
  };

  // --- Send the email ---
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Thank you email sent successfully to ${recipientEmail}`);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(`Error sending email to ${recipientEmail}:`, error);
    const errorMessage = error.response || error.message || 'Unknown error';
    return res.status(500).json({ error: 'Failed to send email.', details: errorMessage });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});
