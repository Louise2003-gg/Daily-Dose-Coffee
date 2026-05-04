import { coffeeItems, nonCoffeeItems, sodaItems, dessertItems } from "../data/menuData";

const stats = [
  {
    label: "Total Orders",
    value: "1,284",
    change: "+12%",
    up: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
  {
    label: "Revenue",
    value: "₱48,320",
    change: "+8.5%",
    up: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    color: "text-[#b8860b]",
    bg: "bg-[#b8860b]/10 border-[#b8860b]/20",
  },
  {
    label: "Customers",
    value: "342",
    change: "+5.2%",
    up: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/20",
  },
  {
    label: "Menu Items",
    value: `${coffeeItems.length + nonCoffeeItems.length + sodaItems.length + dessertItems.length}`,
    change: "Active",
    up: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M5 14.5l-1.402 1.402c-1.232 1.232-.65 3.318 1.067 3.611A48.309 48.309 0 0012 21a48.25 48.25 0 008.135-.687c1.718-.293 2.3-2.379 1.067-3.61L19.8 15.3M5 14.5h14.8" />
      </svg>
    ),
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/20",
  },
];

const recentOrders = [
  { id: "#ORD-001", customer: "Maria Santos",   item: "Iced Caramel Latte",    size: "L",  total: "₱220", status: "Completed", time: "2 min ago" },
  { id: "#ORD-002", customer: "Carlo Reyes",    item: "Mango Soda",            size: "M",  total: "₱120", status: "Preparing", time: "5 min ago" },
  { id: "#ORD-003", customer: "Ana Dela Cruz",  item: "Matcha Latte",          size: "M",  total: "₱200", status: "Completed", time: "12 min ago" },
  { id: "#ORD-004", customer: "Jose Mendoza",   item: "Chocolate Chip Cookie", size: "—",  total: "₱80",  status: "Pending",   time: "18 min ago" },
  { id: "#ORD-005", customer: "Liza Reyes",     item: "Classic Iced Coffee",   size: "XL", total: "₱200", status: "Completed", time: "25 min ago" },
];

const topSelling = [
  { name: "Iced Caramel Latte",    sales: 148, pct: 85 },
  { name: "Mango Soda",            sales: 112, pct: 64 },
  { name: "Matcha Latte",          sales: 98,  pct: 56 },
  { name: "Classic Iced Coffee",   sales: 87,  pct: 50 },
  { name: "Chocolate Chip Cookie", sales: 74,  pct: 42 },
];

const statusColor = {
  Completed: "bg-green-400/15 text-green-400",
  Preparing: "bg-yellow-400/15 text-yellow-400",
  Pending:   "bg-white/10 text-white/50",
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weekData = [42, 58, 35, 72, 89, 110, 95];
const maxVal   = Math.max(...weekData);

export default function Dashboard({ onNavigate }) {
  return (
    <div className="flex flex-col gap-6">

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map(({ label, value, change, up, icon, color, bg }) => (
          <div key={label} className="bg-[#141414] border border-white/8 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${bg} ${color}`}>
                {icon}
              </div>
              {up !== null && (
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${up ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"}`}>
                  {change}
                </span>
              )}
              {up === null && (
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#b8860b]/10 text-[#b8860b]">{change}</span>
              )}
            </div>
            <p className="text-white text-2xl font-bold mb-0.5">{value}</p>
            <p className="text-white/40 text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* Chart + Top Selling */}
      <div className="grid grid-cols-3 gap-4">

        {/* Weekly Sales Bar Chart */}
        <div className="col-span-2 bg-[#141414] border border-white/8 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold text-base">Weekly Sales</h3>
              <p className="text-white/35 text-xs mt-0.5">Orders this week</p>
            </div>
            <span className="text-[#b8860b] text-sm font-semibold">501 orders</span>
          </div>
          <div className="flex items-end gap-3 h-36">
            {weekData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-[#b8860b]/80 hover:bg-[#b8860b] transition-colors cursor-pointer"
                  style={{ height: `${(val / maxVal) * 100}%` }}
                  title={`${val} orders`}
                />
                <span className="text-white/35 text-xs">{weekDays[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling */}
        <div className="bg-[#141414] border border-white/8 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-base mb-1">Top Selling</h3>
          <p className="text-white/35 text-xs mb-5">Best performers this month</p>
          <div className="flex flex-col gap-4">
            {topSelling.map(({ name, sales, pct }) => (
              <div key={name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white/70 text-xs truncate max-w-[140px]">{name}</span>
                  <span className="text-white/50 text-xs">{sales}</span>
                </div>
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div className="h-full bg-[#b8860b] rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-[#141414] border border-white/8 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-white font-semibold text-base">Recent Orders</h3>
            <p className="text-white/35 text-xs mt-0.5">Latest customer orders</p>
          </div>
          <button className="text-[#b8860b] text-xs font-semibold hover:text-yellow-400 transition-colors">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                {["Order ID", "Customer", "Item", "Size", "Total", "Status", "Time"].map((h) => (
                  <th key={h} className="text-left text-white/35 text-xs font-medium pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="py-3 pr-4 text-[#b8860b] text-xs font-mono">{o.id}</td>
                  <td className="py-3 pr-4 text-white text-sm">{o.customer}</td>
                  <td className="py-3 pr-4 text-white/60 text-xs">{o.item}</td>
                  <td className="py-3 pr-4 text-white/60 text-xs">{o.size}</td>
                  <td className="py-3 pr-4 text-white text-sm font-semibold">{o.total}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 text-white/35 text-xs">{o.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
