import { Category, Subcategory } from "../../types/inventory";
import { get } from "../api";
import { getStoredTokens } from "../auth";
// import type { Category, Subcategory } from "../../types/inventory";

export interface ApiInventoryItem {
  id: number;
  name: string;
  current_quantity: number;
  subcategory: {
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
    };
  };
  image: string;
}

export interface ApiInventoryResponse {
  data: {
    items: ApiInventoryItem[];
    count: number;
  };
  status: boolean;
  error: null;
}

export async function getInventoryItems(): Promise<ApiInventoryResponse> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error("No authentication tokens found");
  }

  return get("inventory/items/", tokens.access);
}

export async function getCategories(): Promise<{
  data: Category[];
  status: boolean;
  error: null;
}> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error("No authentication tokens found");
  }

  return get("inventory/category/", tokens.access);
}

export async function getSubcategories(): Promise<{
  data: Subcategory[];
  status: boolean;
  error: null;
}> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error("No authentication tokens found");
  }

  return get("inventory/subcategory/", tokens.access);
}
