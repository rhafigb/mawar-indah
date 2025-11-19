import { CheckCircle, XCircle, X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  // Auto close setelah 3 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-5 right-5 z-100 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-fade-in ${
      type === "success" 
        ? "bg-green-50 border-green-200 text-green-800" 
        : "bg-red-50 border-red-200 text-red-800"
    }`}>
      {type === "success" ? <CheckCircle size={20} /> : <XCircle size={20} />}
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100">
        <X size={16} />
      </button>
    </div>
  );
}