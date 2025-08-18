import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Home, Bot, BarChart3, User, CreditCard } from "lucide-react";

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      icon: Home,
      label: "Home"
    },
    {
      path: "/analytics",
      icon: BarChart3,
      label: "Analytics"
    },
    {
      path: "/wallet-ai",
      icon: Bot,
      label: "WalletAI"
    },
    {
      path: "/mypay",
      icon: CreditCard,
      label: "MyPay"
    },
    {
      path: "/profile",
      icon: User,
      label: "Profile"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center py-2 px-2 sm:px-3 min-w-0 flex-1 touch-manipulation"
            >
              <IconComponent
                className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-indigo-500' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-xs mt-1 transition-colors truncate ${
                  isActive ? 'text-indigo-500' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
