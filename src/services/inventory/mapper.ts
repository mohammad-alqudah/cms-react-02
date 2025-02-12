import type { ApiInventoryItem } from "./api";
import type { InventoryItem } from "../../types/inventory";

export function mapApiInventoryItemToModel(
  apiItem: ApiInventoryItem
): InventoryItem {
  return {
    id: apiItem.id.toString(),
    name: apiItem.name,
    image: apiItem.image,
    quantity: apiItem.current_quantity,
    category: apiItem.subcategory.category.name,
    subcategory: apiItem.subcategory.name,
    center: "-", // Center information not available in API response
    lastUpdated: new Date().toISOString(), // Last updated information not available in API response
  };
}
