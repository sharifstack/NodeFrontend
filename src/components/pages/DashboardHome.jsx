import { TrendingUp, Package, Grid3x3, Tag } from "lucide-react";
import Charts from "../dashboard/HomeUi/Charts";
import RecentProductsTable from "../dashboard/HomeUi/RecentProductsTable";
import EmptyState from "../dashboard/HomeUi/EmptyState";
import {
  useGetAllBrand,
  useGetAllCategories,
  useGetSingleVariant,
} from "../../hooks/api";

export default function DashboardHome() {
  // 🔹 API calls
  const { data: categories } = useGetAllCategories();
  const { data: brands } = useGetAllBrand();
  const { data: singleVariants } = useGetSingleVariant("single");

  // 🔹 Safe counts (undefined guard)
  const totalCategories = categories?.data?.length || 0;
  const totalBrands = brands?.data?.length || 0;
  const singleVariantCount = singleVariants?.data?.length || 0;

  // 🔹 Total products (if you want all)
  const totalProducts = singleVariantCount;

  const recentProducts = singleVariants?.data?.slice(0, 5) || [];

  const hasData =
    totalCategories || totalBrands || singleVariantCount || totalProducts;

  // 🔹 Stat card configurations with icons and colors
  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "+12.5%",
    },
    {
      title: "Categories",
      value: totalCategories,
      icon: Grid3x3,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      trend: "+8.2%",
    },
    {
      title: "Brands",
      value: totalBrands,
      icon: Tag,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      trend: "+5.4%",
    },
    {
      title: "Single Variant",
      value: singleVariantCount,
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      trend: "+15.3%",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 🔹 Header Section */}
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>

        {/* 🔹 Enhanced Stat Cards */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <div className="relative p-6">
                {/* Icon and Trend */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`${stat.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {stat.trend}
                  </span>
                </div>

                {/* Title and Value */}
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value.toLocaleString()}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 Charts Section */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 sm:p-8 animate-fade-in">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Analytics Overview
            </h2>
            <p className="text-gray-600 text-sm">
              Track your performance metrics over time
            </p>
          </div>
          <Charts />
        </div>

        {/* 🔹 Recent Products / Empty State */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden animate-fade-in">
          {hasData ? (
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    Recent Products
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Your latest product additions
                  </p>
                </div>
                <button className="hidden sm:inline-flex items-center px-4 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg text-sm font-medium">
                  View All
                </button>
              </div>
              <RecentProductsTable data={recentProducts} />
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {/* 🔹 Custom Animations CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
