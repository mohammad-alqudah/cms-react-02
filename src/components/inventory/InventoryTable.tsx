import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import Card from "../ui/Card";
import InventoryFilters from "./InventoryFilters";
import { getInventoryItems } from "../../services/inventory/api";
import type { InventoryItem } from "../../types/inventory";
import { mapApiInventoryItemToModel } from "../../services/inventory/mapper";
import Pagination from "../Pagination";
import DataTable from "../table/DataTable";
import { useNavigate } from "react-router-dom";

export default function InventoryTable() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [items, setItems] = useState<InventoryItem[]>([]);
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

  const handleSort = (field: string) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  useEffect(() => {
    async function fetchItems() {
      try {
        setIsLoading(true);
        const response = await getInventoryItems(
          currentPage,
          sort.direction ? sort : undefined,
          search,
          selectedCategory,
          selectedSubcategory,
          selectedCenter
        );

        const mappedItems = response.data.map(mapApiInventoryItemToModel);
        setItems(mappedItems);
        setTotalCount(response.count);
        setHasNext(!!response.next);
        setHasPrevious(!!response.previous);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch inventory items"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchItems();
  }, [
    currentPage,
    search,
    sort,
    selectedCategory,
    selectedSubcategory,
    selectedCenter,
  ]);

  const columns = [
    {
      field: "image",
      label: "الصورة",
      render: (row: any) => (
        <img
          src={row.image}
          alt="Product"
          className="w-12 h-12 object-cover rounded-lg"
        />
      ),
    },
    { field: "name", label: "اسم العنصر" },
    { field: "quantity", label: "الكمية" },
    { field: "category", label: "التصنيف" },
    { field: "subcategory", label: "التصنيف الفرعي" },
    {
      field: "center",
      label: "المركز",
      render: (row: any) => `${row.center}`,
    },
  ];

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
        <>
          <DataTable
            columns={columns}
            data={items}
            sort={sort}
            onSort={handleSort}
            storageKeyName="inventoryTableColumns"
            onRowClick={(id) => navigate(`/inventory/${id}`)}
          />
          <Pagination
            currentPage={currentPage}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            onPageChange={setCurrentPage}
            count={totalCount}
          />
        </>
      )}
    </Card>
  );
}
