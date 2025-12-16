import { SkinInsightItem } from "@/types/Skin";

export function InsightCard({ item }: { item: SkinInsightItem }) {
  const statusColor =
    item.status === "improved"
      ? "text-green-600"
      : item.status === "worsened"
      ? "text-red-600"
      : "text-gray-600";

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold capitalize">
        {item.metric.replace("_", " ")}
      </h3>

      <p className={statusColor}>
        {item.status === "improved" && `Membaik (${item.delta})`}
        {item.status === "worsened" && `Memburuk (+${item.delta})`}
        {item.status === "stable" && "Stabil"}
      </p>

      {item.causes.length > 0 && (
        <>
          <h4 className="mt-2 font-medium">Kemungkinan Penyebab</h4>
          <ul className="list-disc ml-5 text-sm">
            {item.causes.map((cause, i) => (
              <li key={i}>{cause}</li>
            ))}
          </ul>
        </>
      )}

      {item.recommendations.length > 0 && (
        <>
          <h4 className="mt-2 font-medium">Saran</h4>
          <ul className="list-disc ml-5 text-sm">
            {item.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
