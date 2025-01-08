import { useEffect, useRef, useState } from "react";
import type { MonthlyRevenue } from "../types";
import Card from "./ui/Card";

export default function RevenueChart({ data }: { data: MonthlyRevenue[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 300 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setDimensions({
          width: Math.max(width - 40, 300), // Minimum width of 300px
          height: Math.min(width * 0.5, 300), // Responsive height with max of 300px
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const maxValue = Math.max(...data.flatMap((d) => [d.collected, d.expected]));
  const padding = { top: 20, right: 20, bottom: 80, left: 60 }; // Increased bottom padding for vertical labels
  const chartWidth = dimensions.width - padding.left - padding.right;
  const chartHeight = dimensions.height - padding.top - padding.bottom;

  // Calculate points for the lines
  const pointsCollected = data.map((d, i) => ({
    x: i * (chartWidth / (data.length - 1)) + padding.left,
    y:
      dimensions.height -
      (d.collected / maxValue) * chartHeight -
      padding.bottom,
  }));

  const pointsExpected = data.map((d, i) => ({
    x: i * (chartWidth / (data.length - 1)) + padding.left,
    y:
      dimensions.height -
      (d.expected / maxValue) * chartHeight -
      padding.bottom,
  }));

  // Create SVG paths
  const createPath = (points: { x: number; y: number }[]) => {
    return points
      .map((point, i) =>
        i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`
      )
      .join(" ");
  };

  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-6 text-right">
        إحصائيات التحصيل الشهري
      </h3>
      <div ref={containerRef} className="relative">
        <svg
          width={dimensions.width}
          height={dimensions.height}
          className="mx-auto"
        >
          {/* Grid lines and values */}
          {[...Array(5)].map((_, i) => (
            <g key={i}>
              <line
                x1={padding.left}
                y1={padding.top + (i * chartHeight) / 4}
                x2={dimensions.width - padding.right}
                y2={padding.top + (i * chartHeight) / 4}
                stroke="#e5e7eb"
                strokeDasharray="4"
              />
              <text
                x={padding.left - 10}
                y={padding.top + (i * chartHeight) / 4}
                textAnchor="end"
                alignmentBaseline="middle"
                className="text-xs text-gray-500"
              >
                {Math.round(maxValue - (i * maxValue) / 4).toLocaleString()}
              </text>
            </g>
          ))}

          {/* Month labels - Now vertical */}
          {data.map((month, i) => (
            <g key={i}>
              <text
                x={i * (chartWidth / (data.length - 1)) + padding.left}
                y={dimensions.height - padding.bottom + 10}
                textAnchor="end"
                transform={`rotate(45, ${
                  i * (chartWidth / (data.length - 1)) + padding.left
                }, ${dimensions.height - padding.bottom + 10})`}
                className="text-xs text-gray-500"
              >
                {month.month}
              </text>
            </g>
          ))}

          {/* Lines */}
          <path
            d={createPath(pointsCollected)}
            fill="none"
            stroke="#67B37D"
            strokeWidth="3"
          />
          <path
            d={createPath(pointsExpected)}
            fill="none"
            stroke="#67B37D"
            strokeWidth="3"
            strokeDasharray="5,5"
            opacity="0.5"
          />

          {/* Data points */}
          {pointsCollected.map((point, i) => (
            <g key={`collected-${i}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#67B37D"
                className="hover:r-6 transition-all duration-200"
              >
                <title>{data[i].collected.toLocaleString()}</title>
              </circle>
            </g>
          ))}
          {pointsExpected.map((point, i) => (
            <g key={`expected-${i}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#67B37D"
                opacity="0.5"
                className="hover:r-6 transition-all duration-200"
              >
                <title>{data[i].expected.toLocaleString()}</title>
              </circle>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-[#67B37D]" />
            <span className="text-sm text-gray-600">المبلغ المحصل</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-0.5 bg-[#67B37D] opacity-50"
              style={{ borderTop: "2px dashed" }}
            />
            <span className="text-sm text-gray-600">المبلغ المراد تحصيله</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
