import type { InventoryItem } from "./inventory.ts";

interface Props {
  inventory: InventoryItem[];
}

function DashboardCards({ inventory }: Props) {
  const totalItems = inventory.length;

  const lowStock = inventory.filter(
    (item) => item.status === "Low Stock"
  ).length;

  const outOfStock = inventory.filter(
    (item) => item.status === "Out of Stock"
  ).length;

  const totalValue = inventory.reduce(
    (total, item) =>
      total + item.stockQuantity * item.unitPrice,
    0
  );

  const cards = [
    {
      title: "Total Items",
      value: totalItems,
      description: "All inventory items",
    },
    {
      title: "Low Stock",
      value: lowStock,
      description: "Items need attention",
    },
    {
      title: "Out of Stock",
      value: outOfStock,
      description: "Currently unavailable",
    },
    {
      title: "Total Inventory Value",
      value: `₹${totalValue.toLocaleString("en-IN")}`,
      description: "Current stock value",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
        >
          <p className="text-gray-500 text-sm">
            {card.title}
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            {card.value}
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;