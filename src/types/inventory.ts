export interface InventoryItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  category: string;
  subcategory: string;
  center: string;
  description?: string;
  lastUpdated: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
}

export interface Center {
  id: string;
  name: string;
}
