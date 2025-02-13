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
  center: {
    id: number;
    name: string;
  };
}

export interface ApiInventoryResponse {
  data: ApiInventoryItem[];
  count: number;
  status: boolean;
  error: null;
  next: string | null;
  previous: string | null;
}

export async function getInventoryItems(
  page: number = 1,
  sort?: { field: string; direction: "asc" | "desc" | null },
  search?: string,
  selectedCategory?: string,
  selectedSubcategory?: string,
  selectedCenter?: string
): Promise<ApiInventoryResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(sort?.field && { sort: `${sort.field}` }),
    ...(sort?.direction && { order: `${sort.direction}` }),
    ...(search && { search }),
    ...(selectedCategory && { category: selectedCategory }),
    ...(selectedSubcategory && { subcategory: selectedSubcategory }),
    ...(selectedCenter && { center: selectedCenter }),
  });

  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error("No authentication tokens found");
  }

  let endpoint = `inventory/v2/items/?${params.toString()}`;

  return get(endpoint, tokens.access);
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
