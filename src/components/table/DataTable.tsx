import {
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  Settings2,
} from "lucide-react";
import Tooltip from "../ui/Tooltip";
import { useEffect, useState } from "react";

interface Column {
  label: string;
  field: string;
}

interface Sort {
  field: string;
  direction: "asc" | "desc" | null;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (id: string) => void;
  sort?: Sort;
  onSort?: (field: string) => void;
  storageKeyName: string;
}

export default function DataTable({
  columns,
  data,
  onRowClick,
  sort = { field: "", direction: null },
  onSort,
  storageKeyName,
}: DataTableProps) {
  const STORAGE_KEY = storageKeyName;
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(() => {
    const savedColumns = localStorage.getItem(STORAGE_KEY);
    if (savedColumns) {
      return new Set(JSON.parse(savedColumns));
    }
    return new Set(columns.map((col) => col.field));
  });
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  // Save to localStorage whenever visibleColumns changes
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

  const renderMobileView = () => (
    <div className="space-y-4 md:hidden">
      {data.map((row) => (
        <div
          key={row.id}
          onClick={() => onRowClick?.(row.id)}
          className={`bg-white p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors ${
            row.alert ? "bg-red-50 border-red-200" : ""
          }`}
        >
          {row.alert && (
            <div className="flex items-center gap-2 mb-3 text-red-600 bg-red-50 p-2 rounded">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{row.alert}</span>
            </div>
          )}
          {columns.map(({ label, field }) => (
            <div key={field} className="flex justify-between items-center py-1">
              <span className="text-sm font-medium text-gray-500">{label}</span>
              <span className="text-sm text-gray-900">
                {typeof row[field] === "number" &&
                field.toLowerCase().includes("rate")
                  ? `${row[field]}%`
                  : row[field]}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderDesktopView = () => (
    <>
      <div className="mb-4 flex justify-end">
        <div className="relative">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowColumnSelector(!showColumnSelector)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#67B37D]"
            >
              <Settings2 className="h-4 w-4" />
              <span>إعدادات الأعمدة</span>
            </button>
          </div>

          {showColumnSelector && (
            <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu">
                {columns.map(({ label, field }) => (
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
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {visibleColumnsArray.map(({ label, field }) => (
                <th
                  key={field}
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group hover:bg-gray-100 transition-colors"
                  onClick={() => onSort?.(field)}
                >
                  <div className="flex items-center justify-end gap-1">
                    {label}
                    <div className="flex items-center">
                      {sort.field === field ? (
                        sort.direction === "asc" ? (
                          <ChevronUp className="h-4 w-4 text-[#67B37D]" />
                        ) : sort.direction === "desc" ? (
                          <ChevronDown className="h-4 w-4 text-[#67B37D]" />
                        ) : (
                          <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                        )
                      ) : (
                        <ArrowUpDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row.id)}
                className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                  row.alert ? "bg-red-50" : ""
                }`}
              >
                {visibleColumnsArray.map(({ field }, index) => (
                  <td
                    key={field}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    <div className="flex items-center gap-2">
                      {index === 0 && row.alert && (
                        <Tooltip content={row.alert}>
                          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                        </Tooltip>
                      )}
                      {typeof row[field] === "number" &&
                      field.toLowerCase().includes("rate")
                        ? `${row[field]}%`
                        : row[field]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <>
      {renderMobileView()}
      {renderDesktopView()}
    </>
  );
}
