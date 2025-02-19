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

export interface ApiInventoryItemDetails {
  id: number;
  name: string;
  current_quantity: number;
  total_quantity: number;
  subcategory: {
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
    };
  };
  center: {
    id: number;
    name: string;
  };
  history: ApiInventoryHistory[];
}

export interface ApiInventoryHistory {
  type: "ItemIn" | "ItemOut" | "InventoryCheck";
  date: string;
  quantity: number;
  details: string;
  images: string[];
  documents: string[];
}

export interface InventoryHistory {
  type: "in" | "out" | "check";
  date: string;
  quantity: number;
  details: string;
  images: string[];
  documents: string[];
}

export interface InventoryItemDetails {
  id: number;
  name: string;
  currentQuantity: number;
  totalQuantity: number;
  category: string;
  subcategory: string;
  center: string;
  history: InventoryHistory[];
}
