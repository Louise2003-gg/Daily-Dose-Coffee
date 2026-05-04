import { useState } from "react";

const customers = [
  { id: "C001", name: "Maria Santos",     email: "maria@email.com",   orders: 24, spent: "₱4,820", joined: "Dec 2024", status: "Active" },
  { id: "C002", name: "Carlo Reyes",      email: "carlo@email.com",   orders: 18, spent: "₱2,160", joined: "Nov 2024", status: "Active" },
  { id: "C003", name: "Ana Dela Cruz",    email: "ana@email.com",     orders: 31, spent: "₱6,200", joined: "Oct 2024", status: "Active" },
  { id: "C004", name: "Jose Mendoza",     email: "jose@email.com",    orders: 7,  spent: "₱560",   joined: "Jan 2025", status: "Active" },
  { id: "C005", name: "Liza Reyes",       email: "liza@email.com",    orders: 15, spent: "₱3,000", joined: "Dec 2024", status: "Active" },
  { id: "C006", name: "Mark Tan",         email: "mark@email.com",    orders: 9,  spent: "₱1,080", joined: "Jan 2025", status: "Active" },
  { id: "C007", name: "Grace Villanueva", email: "grace@email.com",   orders: 22, spent: "₱3,960", joined: "Nov 2024", status: "Active" },
  { id: "C008", name: "Ryan Bautista",    email: "ryan@email.com",    orders: 5,  spent: "₱1,200", joined: "Jan 2025", status: "Inactive" },
];

export default function Customers() {
  const [search, setSearch] = useState("");

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-xl font-bold">Customers</h2>
          <p className="text-white/35 text-sm mt-0.5">{customers.length} registered customers</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-[#141414] border border-white/8 rounded-xl px-4 py-2.5 max-w-sm">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-white/30">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/25" />
      </div>

      {/* Table */}
      <div className="bg-[#141414] border border-white/8 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/8">
              {["Customer", "Email", "Orders", "Total Spent", "Joined", "Status"].map((h) => (
                <th key={h} className="text-left text-white/35 text-xs font-medium px-5 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#b8860b]/20 border border-[#b8860b]/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#b8860b] text-xs font-bold">{c.name[0]}</span>
                    </div>
                    <span className="text-white text-sm font-medium">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-white/50 text-xs">{c.email}</td>
                <td className="px-5 py-4 text-white text-sm font-semibold">{c.orders}</td>
                <td className="px-5 py-4 text-[#b8860b] text-sm font-semibold">{c.spent}</td>
                <td className="px-5 py-4 text-white/40 text-xs">{c.joined}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
                    ${c.status === "Active" ? "bg-green-400/15 text-green-400" : "bg-white/8 text-white/40"}`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-white/30 text-sm">No customers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
