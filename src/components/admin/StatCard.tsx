import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
  icon: LucideIcon;
  color: "green" | "blue" | "orange";
}

export default function StatCard({ title, value, change, isPositive, icon: Icon, color }: StatCardProps) {
  const colorStyles = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${colorStyles[color]}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={isPositive ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
          {change}
        </span>
        <span className="text-gray-400 ml-2">dari bulan lalu</span>
      </div>
    </div>
  );
}