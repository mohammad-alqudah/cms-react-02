import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Package2, History, FileText } from "lucide-react";
import Card from "../components/ui/Card";
import ImageModal from "../components/ui/ImageModal";
import { getInventoryItem } from "../services/inventory/api";
import { mapApiInventoryItemDetailsToModel } from "../services/inventory/mapper";
import type {
  InventoryItemDetails,
  InventoryHistory,
} from "../types/inventory";

export default function InventoryItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<InventoryItemDetails | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItem() {
      if (!id) return;

      try {
        setIsLoading(true);
        const response = await getInventoryItem(id);
        setItem(mapApiInventoryItemDetailsToModel(response.data.item));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch item details"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchItem();
  }, [id]);

  if (isLoading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!item) return null;

  const getHistoryTypeLabel = (type: InventoryHistory["type"]) => {
    switch (type) {
      case "in":
        return "وارد";
      case "out":
        return "صادر";
      case "check":
        return "جرد";
    }
  };

  const getHistoryTypeColor = (type: InventoryHistory["type"]) => {
    switch (type) {
      case "in":
        return "text-green-600 bg-green-50 border-green-100";
      case "out":
        return "text-red-600 bg-red-50 border-red-100";
      case "check":
        return "text-blue-600 bg-blue-50 border-blue-100";
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/inventory")}
        className="flex items-center gap-2 text-[#67B37D] hover:text-[#67B37D]/80 transition-colors"
      >
        <ArrowRight className="h-5 w-5" />
        <span>العودة إلى المخزون</span>
      </button>

      <Card>
        <div className="flex flex-col md:flex-row gap-6">
          {item.history[0]?.images[0] && (
            <div
              className="relative w-full md:w-64 h-64 rounded-lg overflow-hidden bg-gray-100 group cursor-pointer"
              onClick={() =>
                setSelectedImage({
                  url: item.history[0].images[0],
                  alt: item.name,
                })
              }
            >
              <img
                src={item.history[0].images[0]}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                <Package2 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          )}

          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">الكمية الحالية</p>
                <p className="font-medium text-lg">{item.currentQuantity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">إجمالي الكمية</p>
                <p className="font-medium text-lg">{item.totalQuantity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">المركز</p>
                <p className="font-medium">{item.center}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">التصنيف</p>
                <p className="font-medium">{item.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">التصنيف الفرعي</p>
                <p className="font-medium">{item.subcategory}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-6">
          <History className="h-5 w-5 text-[#67B37D]" />
          <h2 className="text-lg font-medium">سجل الحركات</h2>
        </div>

        <div className="space-y-4">
          {item.history.map((record, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 ${getHistoryTypeColor(
                record.type
              )}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm px-2 py-0.5 rounded-full bg-white bg-opacity-50">
                      {getHistoryTypeLabel(record.type)}
                    </span>
                  </div>
                  <p className="text-sm opacity-75">
                    {new Date(record.date).toLocaleString("ar-EG")}
                  </p>
                </div>
                <span className="text-lg font-medium">
                  {record.type === "in"
                    ? "+"
                    : record.type === "out"
                    ? "-"
                    : ""}
                  {record.quantity}
                </span>
              </div>

              {record.details && (
                <div className="mb-4 p-3 bg-white bg-opacity-50 rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">التفاصيل:</span>{" "}
                    {record.details}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                {record.images.length > 0 && (
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-sm font-medium mb-2">الصور:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {record.images.map((image, idx) => (
                        <div
                          key={idx}
                          className="relative h-20 rounded-lg overflow-hidden bg-gray-100 cursor-pointer group"
                          onClick={() =>
                            setSelectedImage({
                              url: image,
                              alt: `صورة ${getHistoryTypeLabel(
                                record.type
                              )} - ${idx + 1}`,
                            })
                          }
                        >
                          <img
                            src={image}
                            alt={`صورة ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                            <Package2 className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {record.documents && record.documents.length > 0 && (
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-sm font-medium mb-2">المستندات:</p>
                    <div className="space-y-2">
                      {record.documents.map((doc, idx) => (
                        <a
                          key={idx}
                          href={doc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm hover:opacity-80"
                        >
                          <FileText className="h-4 w-4" />
                          مستند {idx + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

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
