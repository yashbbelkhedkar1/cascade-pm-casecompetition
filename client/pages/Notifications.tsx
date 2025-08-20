import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

interface Notification {
  id: string;
  type: "reminder" | "achievement" | "transaction" | "alert";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export default function Notifications() {
  const navigate = useNavigate();

  const handleNotificationClick = (notification: Notification) => {
    // Navigate to respective page based on notification type
    switch (notification.type) {
      case "reminder":
        navigate("/payment-reminders");
        break;
      case "achievement":
        navigate("/goals");
        break;
      case "transaction":
        if (notification.message.includes("expense")) {
          navigate("/expense-history");
        } else if (notification.message.includes("Income") || notification.message.includes("Salary")) {
          navigate("/income-history");
        } else {
          navigate("/");
        }
        break;
      case "alert":
        navigate("/analytics");
        break;
      default:
        navigate("/");
    }
  };

  const notifications: Notification[] = [
    {
      id: "1",
      type: "reminder",
      title: "Payment Reminder",
      message: "Your rent payment of ₹25,000 is due tomorrow",
      timestamp: "2 hours ago",
      isRead: false,
      icon: "💰",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      id: "2", 
      type: "achievement",
      title: "Goal Achievement",
      message: "Congratulations! You've reached 60% of your vacation savings goal",
      timestamp: "1 day ago",
      isRead: false,
      icon: "🎯",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      id: "3",
      type: "transaction",
      title: "Transaction Alert",
      message: "New expense added: ₹850 for groceries",
      timestamp: "2 days ago",
      isRead: true,
      icon: "🛒",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      id: "4",
      type: "alert",
      title: "Budget Alert",
      message: "You've spent 80% of your monthly food budget",
      timestamp: "3 days ago",
      isRead: true,
      icon: "⚠️",
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      id: "5",
      type: "transaction",
      title: "Income Received",
      message: "Salary credited: ₹45,000",
      timestamp: "1 week ago",
      isRead: true,
      icon: "💸",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    }
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.81 7.81 0 0 0-15 0v5" />
          </svg>
        );
      case "achievement":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "transaction":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case "alert":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.81 7.81 0 0 0-15 0v5" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      <Header 
        title="Notifications"
        showBackButton={true}
        onBackClick={() => navigate(-1)}
        rightContent={
          unreadCount > 0 && (
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              {unreadCount} new
            </div>
          )
        }
      />

      <div className="px-4 py-6">
        {/* Summary Card */}
        {unreadCount > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.81 7.81 0 0 0-15 0v5" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">You have {unreadCount} unread notifications</h3>
                <p className="text-sm text-blue-700">Stay updated with your financial activities</p>
              </div>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md cursor-pointer ${
                !notification.isRead ? "border-l-4 border-l-blue-500" : ""
              }`}
            >
              <div className="flex items-start">
                <div className={`w-12 h-12 ${notification.iconBg} rounded-full flex items-center justify-center mr-3 mt-1`}>
                  <span className="text-xl">{notification.icon}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-semibold ${!notification.isRead ? "text-gray-900" : "text-gray-700"}`}>
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-2"></div>
                    )}
                  </div>
                  <p className={`text-sm mb-2 ${!notification.isRead ? "text-gray-700" : "text-gray-600"}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">{notification.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.81 7.81 0 0 0-15 0v5" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Notifications
            </h2>
            <p className="text-gray-600">
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
