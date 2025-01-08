import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface SortableHeaderProps {
  label: string;
  field: string;
  currentSort: { field: string; direction: 'asc' | 'desc' | null };
  onSort: (field: string) => void;
}

export default function SortableHeader({ label, field, currentSort, onSort }: SortableHeaderProps) {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center justify-end gap-1">
        {label}
        <ArrowUpDown 
          className={`h-4 w-4 transition-colors ${
            currentSort.field === field 
              ? 'text-[#67B37D]' 
              : 'text-gray-400 group-hover:text-gray-600'
          }`}
        />
      </div>
    </th>
  );
}