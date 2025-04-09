
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { CreditCard, Shuffle, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    {
      path: "/",
      label: "Swipe",
      icon: Shuffle,
    },
    {
      path: "/create",
      label: "Create",
      icon: CreditCard,
    },
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Glass morphism effect */}
      <div className="backdrop-blur-xl bg-white/10 border-t border-white/20 dark:bg-black/40 dark:border-white/10 px-2 py-1">
        <nav className="max-w-md mx-auto">
          <ul className="flex justify-around items-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path} className="w-1/3">
                  <Link
                    to={item.path}
                    className={cn(
                      "flex flex-col items-center py-2 px-1 rounded-xl transition-all duration-300",
                      isActive 
                        ? "text-dating-yellow scale-110 font-medium" 
                        : "text-gray-500 hover:text-dating-yellow"
                    )}
                  >
                    <div className={cn(
                      "relative p-2 rounded-full mb-1 transition-all duration-300",
                      isActive && "bg-dating-yellow/10"
                    )}>
                      <item.icon 
                        className={cn(
                          "w-5 h-5 transition-all duration-300",
                          isActive && "stroke-dating-yellow"
                        )} 
                      />
                      {isActive && (
                        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-dating-yellow rounded-full" />
                      )}
                    </div>
                    <span className={cn(
                      "text-xs transition-all duration-300",
                      isActive ? "opacity-100" : "opacity-70"
                    )}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BottomNav;
