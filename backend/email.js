// Filename example: api/send-thank-you-email.js (for Vercel/Netlify)
// Or a similar structure for AWS Lambda/Google Cloud Functions

// Import Nodemailer library
// You would need to install it: npm install nodemailer
const nodemailer = require('nodemailer');

// This function will be the entry point for your serverless function
module.exports = async (req, res) => {
  // Ensure it's a POST request
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Parse the request body to get the recipient email
  const { recipientEmail } = req.body;

  // Basic validation
  if (!recipientEmail || typeof recipientEmail !== 'string' || !recipientEmail.includes('@')) {
    return res.status(400).json({ error: 'Invalid recipient email provided.' });
  }

  // --- Configure your email transporter for Gmail ---
  // IMPORTANT: Use environment variables for your Gmail address (EMAIL_USER)
  // and the 16-character App Password (EMAIL_PASS) generated from your Google Account.
  // NEVER hardcode these directly in your code!
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com', // Gmail's SMTP host
    port: parseInt(process.env.EMAIL_PORT || '587', 10), // Gmail's recommended port for TLS
    secure: process.env.EMAIL_SECURE === 'true' || false, // Use 'false' for port 587 (STARTTLS)
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address (e.g., vivaceapp2025@gmail.com)
      pass: process.env.EMAIL_PASS, // The 16-character App Password you generated
    },
  });

  // --- Define the email content ---
  const mailOptions = {
    // The 'from' address should match your EMAIL_USER and be verified by Gmail
    from: `Vivace App <${process.env.SENDER_EMAIL_ADDRESS || 'vivaceapp2025@gmail.com'}>`,
    to: recipientEmail,
    subject: 'Thanks for Joining the Quest!',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #0056b3;">Welcome to the Quest!</h2>
        <p>Dear ${recipientEmail},</p>
        <p>Thank you for signing up for early access to "Turn Practicing Into a Game!".</p>
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
    // Provide more specific error details if available from Nodemailer
    const errorMessage = error.response || error.message || 'Unknown error';
    return res.status(500).json({ error: 'Failed to send email.', details: errorMessage });
  }
};
