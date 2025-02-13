import {
  Package2,
  Settings2,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Eye,
} from "lucide-react";
import { useState, useEffect } from "react";
import type { InventoryItem } from "../../types/inventory";
import ImageModal from "../ui/ImageModal";

interface InventoryGridProps {
  items: InventoryItem[];
  // sort: { field: string; direction: "asc" | "desc" | null };
  // onSort: (field: string) => void;
}

const STORAGE_KEY = "inventory_visible_columns";

interface Column {
  field: keyof InventoryItem | "image";
  label: string;
  sortable?: boolean;
}

const columns: Column[] = [
  { field: "image", label: "الصورة" },
  { field: "name", label: "اسم العنصر", sortable: true },
  { field: "quantity", label: "الكمية", sortable: true },
  { field: "category", label: "التصنيف", sortable: true },
  { field: "subcategory", label: "التصنيف الفرعي", sortable: true },
];

export default function InventoryGrid({
  items,
}: // sort,
// onSort,
InventoryGridProps) {
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(() => {
    const savedColumns = localStorage.getItem(STORAGE_KEY);
    if (savedColumns) {
      return new Set(JSON.parse(savedColumns));
    }
    return new Set(columns.map((col) => col.field));
  });

  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...visibleColumns]));
  }, [visibleColumns]);

  const toggleColumn = (field: string) => {
    const newVisibleColumns = new Set(visibleColumns);
    if (newVisibleColumns.has(field)) {
      // Prevent hiding all columns
      if (newVisibleColumns.size > 1) {
        newVisibleColumns.delete(field);
      }
    } else {
      newVisibleColumns.add(field);
    }
    setVisibleColumns(newVisibleColumns);
  };

  const visibleColumnsArray = columns.filter((col) =>
    visibleColumns.has(col.field)
  );

  const renderSortIcon = (field: string) => {
    if (!sort || sort.field !== field) {
      return (
        <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
      );
    }
    return sort.direction === "asc" ? (
      <ChevronUp className="h-4 w-4 text-[#67B37D]" />
    ) : (
      <ChevronDown className="h-4 w-4 text-[#67B37D]" />
    );
  };

  const renderCell = (item: InventoryItem, field: string) => {
    switch (field) {
      case "image":
        return (
          <div
            className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-100 cursor-pointer group"
            onClick={() =>
              item.image &&
              setSelectedImage({ url: item.image, alt: item.name })
            }
            onMouseEnter={() => setHoveredItemId(item.id)}
            onMouseLeave={() => setHoveredItemId(null)}
          >
            {item.image ? (
              <>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                {hoveredItemId === item.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity">
                    <Eye className="h-5 w-5 text-white" />
                  </div>
                )}
              </>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Package2 className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>
        );
      default:
        return item[field as keyof InventoryItem];
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <div className="relative">
          <button
            onClick={() => setShowColumnSelector(!showColumnSelector)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#67B37D]"
          >
            <Settings2 className="h-4 w-4" />
            <span>إعدادات الأعمدة</span>
          </button>

          {showColumnSelector && (
            <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu">
                {columns.map(({ field, label }) => (
                  <label
                    key={field}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns.has(field)}
                      onChange={() => toggleColumn(field)}
                      className="ml-2 h-4 w-4 text-[#67B37D] focus:ring-[#67B37D] border-gray-300 rounded"
                      disabled={
                        visibleColumns.has(field) && visibleColumns.size === 1
                      }
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {visibleColumnsArray.map(({ field, label, sortable }) => (
                <th
                  key={field}
                  scope="col"
                  onClick={() => sortable && onSort(field)}
                  className={`px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase ${
                    sortable ? "cursor-pointer group hover:bg-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center justify-end gap-1">
                    {label}
                    {sortable && renderSortIcon(field)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {visibleColumnsArray.map(({ field }) => (
                  <td key={field} className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {renderCell(item, field)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage.url}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
