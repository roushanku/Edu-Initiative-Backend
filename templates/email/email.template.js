class EmailTemplates {
  static getTemplate(type, data) {
    switch (type) {
      case 'PAYMENT_RECEIVED':
        return this.paymentReceivedTemplate(data);
      case 'PAYMENT_CONFIRMED':
        return this.paymentConfirmedTemplate(data);
      case 'BOOKING_REQUEST':
        return this.bookingRequestTemplate(data);
      case 'BOOKING_CONFIRMED':
        return this.bookingConfirmedTemplate(data);
      default:
        throw new Error(`Template not found for type: ${type}`);
    }
  }

  static paymentReceivedTemplate(data) {
    const { userName, amount, currency, paymentId, date, tutorName, subject, duration } = data;

    return {
      subject: `Payment Received - ${amount} ${currency}`,
      html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2>Payment Received</h2>
                  <p>Dear ${userName},</p>
                  
                  <p>We have received your payment of ${amount} ${currency} for your tutoring session.</p>
                  
                  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                      <h3>Payment Details:</h3>
                      <ul style="list-style: none; padding: 0;">
                          <li>Payment ID: ${paymentId}</li>
                          <li>Amount: ${amount} ${currency}</li>
                          <li>Date: ${date}</li>
                          <li>Tutor: ${tutorName}</li>
                          <li>Subject: ${subject}</li>
                          <li>Duration: ${duration}</li>
                      </ul>
                  </div>

                  <p>Your payment is being processed and will be confirmed shortly.</p>
                  
                  <p>If you have any questions, please don't hesitate to contact our support team.</p>
                  
                  <p>Best regards,<br>Your Tutoring Team</p>
              </div>
          `,
    };
  }

  static paymentConfirmedTemplate(data) {
    const { userName, amount, currency, paymentId, tutorName, subject, sessionDate, sessionTime } = data;

    return {
      subject: `Payment Confirmed - Ready for Your Session`,
      html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2>Payment Confirmed</h2>
                  <p>Dear ${userName},</p>
                  
                  <p>Great news! Your payment has been confirmed and your tutoring session is now booked.</p>
                  
                  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                      <h3>Session Details:</h3>
                      <ul style="list-style: none; padding: 0;">
                          <li>Tutor: ${tutorName}</li>
                          <li>Subject: ${subject}</li>
                          <li>Date: ${sessionDate}</li>
                          <li>Time: ${sessionTime}</li>
                          <li>Amount Paid: ${amount} ${currency}</li>
                          <li>Payment ID: ${paymentId}</li>
                      </ul>
                  </div>

                  <p>Please make sure to:</p>
                  <ul>
                      <li>Be online 5 minutes before your session</li>
                      <li>Have your study materials ready</li>
                      <li>Test your audio/video if it's an online session</li>
                  </ul>
                  
                  <p>Best regards,<br>Your Tutoring Team</p>
              </div>
          `,
    };
  }

  static bookingRequestTemplate(data) {
    const { tutorName, studentName, subject, proposedDate, proposedTime, studentMessage, duration, rate } = data;

    return {
      subject: `New Tutoring Request from ${studentName}`,
      html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2>New Tutoring Request</h2>
                  <p>Dear ${tutorName},</p>
                  
                  <p>You have received a new tutoring request from ${studentName}.</p>
                  
                  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                      <h3>Session Details:</h3>
                      <ul style="list-style: none; padding: 0;">
                          <li>Subject: ${subject}</li>
                          <li>Proposed Date: ${proposedDate}</li>
                          <li>Proposed Time: ${proposedTime}</li>
                          <li>Duration: ${duration}</li>
                          <li>Rate: ${rate}</li>
                      </ul>
                      
                      <h3>Student's Message:</h3>
                      <p>${studentMessage}</p>
                  </div>

                  <div style="margin: 20px 0;">
                      <a href="#" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;">Accept Request</a>
                      <a href="#" style="background-color: #f44336; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Decline Request</a>
                  </div>
                  
                  <p>Please respond to this request within 24 hours.</p>
                  
                  <p>Best regards,<br>Your Tutoring Team</p>
              </div>
          `,
    };
  }

  static bookingConfirmedTemplate(data) {
    const { studentName, tutorName, subject, sessionDate, sessionTime, duration, zoomLink, additionalInstructions } = data;

    return {
      subject: `Tutoring Session Confirmed with ${tutorName}`,
      html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2>Tutoring Session Confirmed</h2>
                  <p>Dear ${studentName},</p>
                  
                  <p>Your tutoring session has been confirmed!</p>
                  
                  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                      <h3>Session Details:</h3>
                      <ul style="list-style: none; padding: 0;">
                          <li>Tutor: ${tutorName}</li>
                          <li>Subject: ${subject}</li>
                          <li>Date: ${sessionDate}</li>
                          <li>Time: ${sessionTime}</li>
                          <li>Duration: ${duration}</li>
                      </ul>
                      
                      <h3>Meeting Link:</h3>
                      <p><a href="${zoomLink}">${zoomLink}</a></p>
                      
                      ${
                        additionalInstructions
                          ? `
                      <h3>Additional Instructions:</h3>
                      <p>${additionalInstructions}</p>
                      `
                          : ''
                      }
                  </div>

                  <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
                      <h3>Preparation Checklist:</h3>
                      <ul>
                          <li>Test your internet connection</li>
                          <li>Prepare your study materials</li>
                          <li>Join the session 5 minutes early</li>
                          <li>Have a quiet study space ready</li>
                      </ul>
                  </div>
                  
                  <p>If you need to reschedule or cancel, please do so at least 24 hours before the session.</p>
                  
                  <p>Best regards,<br>Your Tutoring Team</p>
              </div>
          `,
    };
  }
}

export default EmailTemplates;
