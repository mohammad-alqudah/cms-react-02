import { useState } from "react";
import { Phone, Lock, Loader2 } from "lucide-react";
import { login } from "../services/auth";
import { useAuth } from "../contexts/AuthContext";

export default function LoginForm() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login({
        mobile_number: mobileNumber,
        password,
      });

      if (response.status) {
        setIsAuthenticated(true);
        window.location.href = "/";
      } else {
        setError(response.error || "حدث خطأ أثناء تسجيل الدخول");
      }
    } catch (err) {
      setError("حدث خطأ أثناء الاتصال بالخادم");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-[#67B37D]/10">
          <Phone className="h-6 w-6 text-[#67B37D]" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          تسجيل الدخول
        </h2>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div className="relative">
            <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              required
              className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#67B37D] focus:border-[#67B37D] focus:z-10 sm:text-sm pr-10"
              placeholder="رقم الهاتف"
              dir="rtl"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              required
              className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#67B37D] focus:border-[#67B37D] focus:z-10 sm:text-sm pr-10"
              placeholder="كلمة المرور"
              dir="rtl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#67B37D] hover:bg-[#67B37D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#67B37D] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "تسجيل الدخول"
          )}
        </button>
      </form>
    </div>
  );
}
