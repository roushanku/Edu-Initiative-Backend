import Notification from "../../../models/notification.model.js";
import nodemailer from "nodemailer";
import {GMAIL_USER , GMAIL_APP_PASS} from "../../../scerets.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

// Email templates
const emailTemplates = {
  BOOKING_REQUEST: {
    subject: "New Booking Request",
    template: (data) => `
      Dear ${data.recipientName},
      You have received a new booking request for ${data.sessionDate}.
      Click here to respond: ${data.actionUrl}
    `,
  },
  BOOKING_CONFIRMED: {
    subject: "Booking Confirmed",
    template: (data) => `
      Dear ${data.recipientName},
      Your booking for ${data.sessionDate} has been confirmed.
      Session details: ${data.sessionDetails}
    `,
  },
};

const sendEmail = async (params) => {
  const { notificationId, type, recipientEmail, data } = params;
  const maxRetries = 3;
  let attempts = 0;

  const attemptSendEmail = async () => {
    try {
      // Fix: Changed emailTemplates.type to emailTemplates[type]
      const emailTemplate = emailTemplates[type];
      
      if (!emailTemplate) {
        throw new Error("Email template not found");
      }

      const mailOptions = {
        from: process.env.SMTP_FROM,
        to: recipientEmail,
        subject: emailTemplate.subject,
        text: emailTemplate.template(data),
      };

      const result = await transporter.sendMail(mailOptions);
      
      // Update notification with email sent status
      await Notification.findByIdAndUpdate(notificationId, {
        $set: { emailStatus: "SENT" },
      });

      return {
        status: true,
        message: "Email sent successfully",
        data: result,
      };
    } catch (error) {
      attempts++;
      if (attempts < maxRetries) {
        // Wait for 2 seconds before retrying
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return attemptSendEmail();
      }
      throw new Error(error.message);
    }
  };

  return attemptSendEmail();
};

const createNotification = async (notificationData) => {
  const {
    userId,
    userType,
    type,
    title,
    message,
    relatedEntityId,
    relatedEntityType,
    emailData,
  } = notificationData;

  try {
    const notification = await Notification.create({
      userId,
      userType,
      title,
      message,
      type,
      relatedEntityId,
      relatedEntityType,
    });

    // Send email if emailData is provided
    if (emailData) {
      await sendEmail({
        notificationId: notification._id,
        type,
        recipientEmail: emailData.recipientEmail,
        data: emailData,
      });
    }

    return {
      status: true,
      message: "Notification created successfully",
      data: notification,
    };
  } catch (error) {
    // Changed to throw Error instead of object
    throw new Error(error.message);
  }
};


export const getNotifications = async (params) => {
  try {
    const { userId, page = 1, limit = 10 } = params;

    if (!userId) {
      return {
        status: false,
        message: "User ID is required",
      };
    }

    // Convert page and limit to numbers and set defaults
    const currentPage = Math.max(1, parseInt(page));
    const itemsPerPage = Math.max(1, parseInt(limit));

    // Create the query object
    const query = { userId };

    // Execute both count and find queries concurrently
    const [notifications, totalItems] = await Promise.all([
      Notification.find(query)
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * itemsPerPage)
        .limit(itemsPerPage),
      Notification.countDocuments(query),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    return {
      status: true,
      message: "Notifications fetched successfully",
      data: {
        notifications,
        pagination: {
          totalItems,
          itemsPerPage,
          currentPage,
          totalPages,
          hasNextPage,
          hasPreviousPage,
          // Add next and previous page numbers if they exist
          nextPage: hasNextPage ? currentPage + 1 : null,
          previousPage: hasPreviousPage ? currentPage - 1 : null,
          // First and last item numbers on current page
          firstItemOnPage:
            notifications.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0,
          lastItemOnPage:
            notifications.length > 0
              ? (currentPage - 1) * itemsPerPage + notifications.length
              : 0,
        },
      },
    };
  } catch (error) {
    throw {
      status: false,
      message: "Error fetching notifications",
      error: error.message,
    };
  }
};

export const getUnreadNotifications = async (params) => {
  const { userId } = params;

  try {
    if (!userId) {
      return {
        status: false,
        message: "User ID is required",
      };
    }
    const notifications = await Notification.find({ userId, readAt: null })
      .sort({ createdAt: -1 })
      .limit(5);
    return {
      status: true,
      message: "Unread notifications fetched successfully",
      data: notifications,
    };
  } catch (error) {
    throw {
      status: false,
      message: "Error fetching unread notifications",
      error: error.message,
    };
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return {
        status: false,
        message: "Notification not found",
      };
    }
    notification.readAt = new Date();
    await notification.save();
    return {
      status: true,
      message: "Notification marked as read",
      data: notification,
    };
  } catch (error) {
    throw {
      status: false,
      message: "Error marking notification as read",
      error: error.message,
    };
  }
};

export const markAllNotificationsAsRead = async (params) => {
  const userId = params;
  try {
    if (!userId) {
      return {
        status: false,
        message: "User ID is required",
      };
    }
    await Notification.updateMany(
      { userId, readAt: null },
      { readAt: new Date() }
    );
    return {
      status: true,
      message: "All notifications marked as read",
    };
  } catch (error) {
    throw {
      status: false,
      message: "Error marking all notifications as read",
      error: error.message,
    };
  }
};

export const sendBookingRequestNotification = async (notificationData) => {
  try {
    const result = await createNotification({
      userId: notificationData.tutorId,
      userType: "TUTOR",
      type: "BOOKING_REQUEST",
      title: "New Booking Request",
      message: `You have received a new booking request for ${notificationData.studentName}`,
      relatedEntityId: notificationData.bookingId,
      relatedEntityType: "BOOKING",
      emailData: {
        recipientEmail: notificationData.tutorEmail,
        recipientName: notificationData.tutorName,
        sessionDate: notificationData.sessionDate,
        studentName: notificationData.studentName,
      },
    });
    return result;
  } catch (error) {
    return {
      status: false,
      message: "Error sending booking request notification",
      error: error.message,
    }
  }
};
