"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Flower2, Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simulasi Logika Login Sederhana
    setTimeout(() => {
      if (email === "admin@mawarindah.com" && password === "admin123") {
        router.push("/admin"); // Redirect ke Dashboard jika sukses
      } else {
        setError("Email atau password salah!");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      {/* Brand Logo */}
      <div className="mb-8 flex flex-col items-center animate-bounce">
        <div className="bg-brand-green p-3 rounded-xl text-white mb-3 shadow-lg shadow-green-200">
           <Flower2 size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Mawar Admin</h2>
        <p className="text-gray-500 text-sm">Portal Manajemen Toko</p>
      </div>

      {/* Login Card */}
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md relative overflow-hidden">
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-brand-green"></div>

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Selamat Datang</h1>
          <p className="text-gray-500 text-sm mt-1">Silakan masuk untuk mengelola toko.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-brand-green transition" size={20} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mawarindah.com"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-green-100 outline-none transition text-gray-700"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-brand-green transition" size={20} />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-green-100 outline-none transition text-gray-700"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <button type="button" className="text-xs font-medium text-brand-green hover:underline">Lupa password?</button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-brand-green text-white py-3.5 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-emerald-800 hover:shadow-xl active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                Masuk Dashboard <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Credential Hint (Optional: Hapus jika sudah live production) */}
        <div className="mt-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-500 text-center">
          <p className="font-bold mb-1">Demo Credentials:</p>
          <p>Email: admin@mawarindah.com</p>
          <p>Pass: admin123</p>
        </div>
      </div>

      {/* Footer Link */}
      <p className="mt-8 text-sm text-gray-500">
        Bukan admin? <Link href="/" className="text-brand-green font-semibold hover:underline">Kembali ke Toko</Link>
      </p>
    </div>
  );
}