import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getCategories, getSubcategories } from "../../services/inventory/api";
import type { Category, Subcategory } from "../../types/inventory";

interface InventoryFiltersProps {
  show: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedSubcategory: string;
  onSubcategoryChange: (value: string) => void;
  selectedCenter: string;
  onCenterChange: (value: string) => void;
}

export default function InventoryFilters({
  show,
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSubcategory,
  onSubcategoryChange,
  selectedCenter,
  onCenterChange,
}: InventoryFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [categoriesResponse, subcategoriesResponse] = await Promise.all([
          getCategories(),
          getSubcategories(),
        ]);

        setCategories(categoriesResponse.data);
        setSubcategories(subcategoriesResponse.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (!show) return null;

  const filteredSubcategories = subcategories.filter(
    (sub: any) =>
      !selectedCategory || sub.category.toString() === selectedCategory
  );

  // Temporary mock data for centers
  const centers = ["المركز الرئيسي", "مركز التحفيظ", "المركز النسائي"];

  if (isLoading) {
    return <div className="text-center py-4">جاري تحميل البيانات...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="بحث..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent"
          />
        </div>

        <div className="relative">
          <label className="absolute -top-2 right-3 bg-gray-50 px-2 text-xs font-medium text-gray-600">
            التصنيف
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              onCategoryChange(e.target.value);
              onSubcategoryChange("");
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent bg-white"
          >
            <option value="">الكل</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="absolute -top-2 right-3 bg-gray-50 px-2 text-xs font-medium text-gray-600">
            التصنيف الفرعي
          </label>
          <select
            value={selectedSubcategory}
            onChange={(e) => onSubcategoryChange(e.target.value)}
            disabled={!selectedCategory}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">الكل</option>
            {filteredSubcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="absolute -top-2 right-3 bg-gray-50 px-2 text-xs font-medium text-gray-600">
            المركز
          </label>
          <select
            value={selectedCenter}
            onChange={(e) => onCenterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent bg-white"
          >
            <option value="">الكل</option>
            {centers.map((center) => (
              <option key={center} value={center}>
                {center}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
