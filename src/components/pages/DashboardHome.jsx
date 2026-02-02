import StatCard from "../dashboard/HomeUi/StatCard";
import Charts from "../dashboard/HomeUi/Charts";
import RecentProductsTable from "../dashboard/HomeUi/RecentProductsTable";
import EmptyState from "../dashboard/HomeUi/EmptyState";
import { useGetAllBrand, useGetAllCategories, useGetSingleVariant } from "../../hooks/api";


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
  const totalProducts = singleVariantCount; // later multiple variant add

  const recentProducts = singleVariants?.data?.slice(0, 5) || [];

  const hasData =
    totalCategories || totalBrands || singleVariantCount || totalProducts;

  return (
    <div className="space-y-8">
      {/* 🔹 Stat Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Products" value={totalProducts} />
        <StatCard title="Categories" value={totalCategories} />
        <StatCard title="Brands" value={totalBrands} />
        <StatCard title="Single Variant" value={singleVariantCount} />
      </div>

      {/* 🔹 Charts */}
      <Charts />

      {/* 🔹 Table / Empty */}
      {hasData ? <RecentProductsTable data={recentProducts} /> : <EmptyState />}
    </div>
  );
}
