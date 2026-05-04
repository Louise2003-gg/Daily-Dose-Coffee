import { useState } from "react";

const allOrders = [
  { id: "#ORD-001", customer: "Maria Santos",   item: "Iced Caramel Latte",      size: "L",  milk: "Fresh Milk",      total: "₱220", status: "Completed", date: "2025-01-15 09:12" },
  { id: "#ORD-002", customer: "Carlo Reyes",    item: "Mango Soda",              size: "M",  milk: "—",               total: "₱120", status: "Preparing", date: "2025-01-15 09:08" },
  { id: "#ORD-003", customer: "Ana Dela Cruz",  item: "Matcha Latte",            size: "M",  milk: "Full Cream Milk", total: "₱200", status: "Completed", date: "2025-01-15 09:01" },
  { id: "#ORD-004", customer: "Jose Mendoza",   item: "Chocolate Chip Cookie",   size: "—",  milk: "—",               total: "₱80",  status: "Pending",   date: "2025-01-15 08:55" },
  { id: "#ORD-005", customer: "Liza Reyes",     item: "Classic Iced Coffee",     size: "XL", milk: "Fresh Milk",      total: "₱200", status: "Completed", date: "2025-01-15 08:48" },
  { id: "#ORD-006", customer: "Mark Tan",       item: "Blueberry Soda",          size: "L",  milk: "—",               total: "₱120", status: "Completed", date: "2025-01-15 08:40" },
  { id: "#ORD-007", customer: "Grace Villanueva", item: "Strawberry Milk",       size: "M",  milk: "Full Cream Milk", total: "₱180", status: "Preparing", date: "2025-01-15 08:35" },
  { id: "#ORD-008", customer: "Ryan Bautista",  item: "Iced Mocha Blend",        size: "L",  milk: "Fresh Milk",      total: "₱240", status: "Pending",   date: "2025-01-15 08:28" },
];

const statusColor = {
  Completed: "bg-green-400/15 text-green-400",
  Preparing: "bg-yellow-400/15 text-yellow-400",
  Pending:   "bg-white/10 text-white/50",
  Cancelled: "bg-red-400/15 text-red-400",
};

const filters = ["All", "Pending", "Preparing", "Completed"];

export default function Orders() {
  const [filter, setFilter]   = useState("All");
  const [search, setSearch]   = useState("");

  const filtered = allOrders.filter((o) => {
    const matchFilter = filter === "All" || o.status === filter;
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) ||
                        o.item.toLowerCase().includes(search.toLowerCase()) ||
                        o.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-xl font-bold">Orders</h2>
          <p className="text-white/35 text-sm mt-0.5">{allOrders.length} total orders</p>
        </div>
        <button className="bg-[#b8860b] hover:bg-yellow-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          + New Order
        </button>
      </div>

      {/* Filters + Search */}
      <div className="flex items-center gap-4">
        <div className="flex bg-[#141414] border border-white/8 rounded-xl p-1 gap-1">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150
                ${filter === f ? "bg-[#b8860b] text-white" : "text-white/50 hover:text-white"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex-1 flex items-center gap-2 bg-[#141414] border border-white/8 rounded-xl px-4 py-2.5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-white/30">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders, customers..."
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/25" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#141414] border border-white/8 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/8">
              {["Order ID", "Customer", "Item", "Size", "Milk", "Total", "Status", "Date"].map((h) => (
                <th key={h} className="text-left text-white/35 text-xs font-medium px-5 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                <td className="px-5 py-4 text-[#b8860b] text-xs font-mono font-semibold">{o.id}</td>
                <td className="px-5 py-4 text-white text-sm">{o.customer}</td>
                <td className="px-5 py-4 text-white/60 text-xs">{o.item}</td>
                <td className="px-5 py-4 text-white/60 text-xs">{o.size}</td>
                <td className="px-5 py-4 text-white/60 text-xs">{o.milk}</td>
                <td className="px-5 py-4 text-white font-semibold text-sm">{o.total}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[o.status]}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-white/35 text-xs">{o.date}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="px-5 py-10 text-center text-white/30 text-sm">No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
