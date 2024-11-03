import nodemailer from 'nodemailer';
import Redis from 'ioredis';
import { promisify } from 'util';
import EmailTemplates from '../../../templates/email/email.template.js';
import { GMAIL_USER, GMAIL_APP_PASS } from '../../../scerets.js';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail service
  secure: true,
  port: 465,
  auth: {
    user: GMAIL_USER, // Your Gmail address
    pass: GMAIL_APP_PASS, // Your Gmail app password
  },
});

export const sendEmail = async (req, res) => {
  try {
    // Get email template
    const emailData = req.body;
    const template = EmailTemplates.getTemplate(emailData.type, emailData.data);
    // Send email
    await transporter.sendMail({
      from: `"EDU Initiative Team " <${GMAIL_USER}>`, // Sender address (your Gmail)
      to: emailData.to,
      subject: template.subject,
      html: template.html,
    });
    res.json({
      status: 'SENT',
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.json({
      status: 'FAILED sending email',
      message: error,
    });
  }
};
