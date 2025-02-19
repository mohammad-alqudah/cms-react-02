import type { ApiInventoryItem } from "./api";
import type {
  ApiInventoryHistory,
  ApiInventoryItemDetails,
  InventoryHistory,
  InventoryItem,
  InventoryItemDetails,
} from "../../types/inventory";

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
    center: apiItem.center.name,
    lastUpdated: new Date().toISOString(), // Last updated information not available in API response
  };
}

export function mapApiInventoryItemDetailsToModel(
  apiItem: ApiInventoryItemDetails
): InventoryItemDetails {
  return {
    id: apiItem.id,
    name: apiItem.name,
    currentQuantity: apiItem.current_quantity,
    totalQuantity: apiItem.total_quantity,
    category: apiItem.subcategory.category.name,
    subcategory: apiItem.subcategory.name,
    center: apiItem.center.name,
    history: apiItem.history.map(mapApiHistoryToModel),
  };
}

export function mapApiHistoryToModel(
  apiHistory: ApiInventoryHistory
): InventoryHistory {
  return {
    type: mapHistoryType(apiHistory.type),
    date: apiHistory.date,
    quantity: apiHistory.quantity,
    details: apiHistory.details,
    images: apiHistory.images,
    documents: apiHistory.documents,
  };
}

function mapHistoryType(
  type: ApiInventoryHistory["type"]
): InventoryHistory["type"] {
  switch (type) {
    case "ItemIn":
      return "in";
    case "ItemOut":
      return "out";
    case "InventoryCheck":
      return "check";
  }
}
