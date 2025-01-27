import { useNavigate, useLocation } from "react-router-dom";
import { Book, Users, BarChart, X, LogOut } from "lucide-react";
import { removeTokens } from "../services/auth";
import { useAuth } from "../contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated } = useAuth();

  const handleLogout = () => {
    removeTokens();
    setIsAuthenticated(false);
  };

  const getActivePath = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">لوحة التحكم</h1>
        <button
          onClick={onClose}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="mt-6 flex flex-col h-[calc(100%-4rem)] justify-between">
        <div className="px-4 space-y-2">
          <button
            onClick={() => {
              navigate("/courses");
              onClose();
            }}
            className={`flex items-center w-full px-4 py-2 text-gray-700 rounded-lg ${
              getActivePath("/courses")
                ? "bg-[#67B37D]/10 text-[#67B37D]"
                : "hover:bg-gray-100"
            }`}
          >
            <Book className="h-5 w-5 ml-3" />
            <span className="font-medium">دورات التجويد</span>
          </button>

          <button
            onClick={() => {
              navigate("/students");
              onClose();
            }}
            className={`flex items-center w-full px-4 py-2 text-gray-700 rounded-lg ${
              getActivePath("/students")
                ? "bg-[#67B37D]/10 text-[#67B37D]"
                : "hover:bg-gray-100"
            }`}
          >
            <Users className="h-5 w-5 ml-3" />
            <span className="font-medium">الطلاب</span>
          </button>

          {/* <button
            onClick={() => {
              navigate('/statistics');
              onClose();
            }}
            className={`flex items-center w-full px-4 py-2 text-gray-700 rounded-lg ${
              getActivePath('/statistics') ? 'bg-[#67B37D]/10 text-[#67B37D]' : 'hover:bg-gray-100'
            }`}
          >
            <BarChart className="h-5 w-5 ml-3" />
            <span className="font-medium">احصائيات</span>
          </button> */}
        </div>

        <div className="px-4 pb-6">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 ml-3" />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={onClose}
          />
          <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:right-0 lg:z-50 lg:block lg:w-64 lg:bg-white lg:border-r lg:border-gray-200">
        {sidebarContent}
      </div>
    </>
  );
}
