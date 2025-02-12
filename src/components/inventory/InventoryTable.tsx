import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import Card from "../ui/Card";
import InventoryFilters from "./InventoryFilters";
import InventoryGrid from "./InventoryGrid";
import { getInventoryItems } from "../../services/inventory/api";
import type { InventoryItem } from "../../types/inventory";
import { mapApiInventoryItemToModel } from "../../services/inventory/mapper";

export default function InventoryTable() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");
  const [sort, setSort] = useState<{
    field: string;
    direction: "asc" | "desc" | null;
  }>({
    field: "",
    direction: null,
  });

  useEffect(() => {
    async function fetchItems() {
      try {
        setIsLoading(true);
        const response = await getInventoryItems();
        const mappedItems = response.data.items.map(mapApiInventoryItemToModel);
        setItems(mappedItems);
        setTotalCount(response.data.count);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch inventory items"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchItems();
  }, []);

  const handleSort = (field: string) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedAndFilteredItems = [...items]
    .filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        !selectedCategory || item.category === selectedCategory;
      const matchesSubcategory =
        !selectedSubcategory || item.subcategory === selectedSubcategory;
      const matchesCenter = !selectedCenter || item.center === selectedCenter;

      return (
        matchesSearch && matchesCategory && matchesSubcategory && matchesCenter
      );
    })
    .sort((a, b) => {
      if (!sort.field || !sort.direction) return 0;

      const aValue: any = a[sort.field as keyof InventoryItem];
      const bValue: any = b[sort.field as keyof InventoryItem];

      if (sort.direction === "asc") {
        if (aValue === undefined || bValue === undefined) return 0;
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  if (error) {
    return (
      <Card>
        <div className="text-red-600 text-center py-4">{error}</div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">المخزون</h2>
          <p className="text-sm text-gray-500">
            إجمالي عدد العناصر: {totalCount}
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#67B37D] hover:bg-[#67B37D]/10 rounded-lg transition-colors"
        >
          <Filter className="h-4 w-4" />
          {showFilters ? "إخفاء الفلترة" : "إظهار الفلترة"}
        </button>
      </div>

      <InventoryFilters
        show={showFilters}
        search={search}
        onSearchChange={setSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedSubcategory={selectedSubcategory}
        onSubcategoryChange={setSelectedSubcategory}
        selectedCenter={selectedCenter}
        onCenterChange={setSelectedCenter}
      />

      {isLoading ? (
        <div className="text-center py-8">جاري التحميل...</div>
      ) : (
        <InventoryGrid
          items={sortedAndFilteredItems}
          sort={sort}
          onSort={handleSort}
        />
      )}
    </Card>
  );
}
