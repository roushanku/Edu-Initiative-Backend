import Notification from "../../../models/notification.model.js";
export const createNotification = async (notificationData) => {
  const {
    userId,
    userType,
    title,
    message,
    type,
    relatedEntityId,
    relatedEntityType,
  } = notificationData;
  try {
    const notification = new Notification({
      userId,
      userType,
      title,
      message,
      type,
      relatedEntityId,
      relatedEntityType,
    });
    await notification.save();
    return {
      status: true,
      message: "Notification created successfully",
      data: notification,
    };
  } catch {
    return {
      status: false,
      message: "Error creating notification",
    };
  }
};

export const getNotifications = async (params) => {
  try {
    const { userId, page = 1, limit = 10 } = params;

    if(!userId) {
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
    if(!userId) {
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
        data : notification
        };
    } catch (error) {
        throw {
        status: false,
        message: "Error marking notification as read",
        error: error.message,
        };
    }
}

export const markAllNotificationsAsRead = async (params) => {
    const userId = params;
    try {
        if(!userId) {
            return {
                status: false,
                message: "User ID is required",
            };
        }
        await Notification.updateMany({ userId, readAt: null }, { readAt: new Date() });
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
}
