import nodemailer from 'nodemailer';
import Redis from 'ioredis';
import { promisify } from 'util';

class EmailService {
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    });

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Start processing the queue
    this.processEmailQueue();
  }

  async queueEmail(notification) {
    const emailData = {
      to: notification.userId.email, // Assuming user email is populated
      subject: notification.title,
      text: notification.message,
      notificationId: notification._id,
    };

    await this.redis.lpush('email_queue', JSON.stringify(emailData));
  }

  async processEmailQueue() {
    while (true) {
      try {
        // Block for 0 seconds if queue is empty
        const data = await this.redis.brpop('email_queue', 0);

        if (data) {
          const emailData = JSON.parse(data[1]);
          await this.sendEmail(emailData);
        }
      } catch (error) {
        console.error('Error processing email queue:', error);
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  async sendEmail(emailData) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.text,
      });

      // Update notification with email sent status if needed
      // await NotificationService.updateEmailStatus(emailData.notificationId, 'SENT');
    } catch (error) {
      console.error('Error sending email:', error);
      // Requeue failed emails
      await this.queueEmail(emailData);
    }
  }
}

export default new EmailService();
