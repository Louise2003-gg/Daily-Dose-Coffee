import { useState } from "react";
import { coffeeItems, nonCoffeeItems, sodaItems, dessertItems } from "../data/menuData";

const allProducts = [
  ...coffeeItems.map((i) => ({ ...i, category: "Iced Coffee" })),
  ...nonCoffeeItems.map((i) => ({ ...i, category: "Non-Coffee" })),
  ...sodaItems.map((i) => ({ ...i, category: "Soda" })),
  ...dessertItems.map((i) => ({ ...i, category: "Dessert" })),
];

const categories = ["All", "Iced Coffee", "Non-Coffee", "Soda", "Dessert"];

const catColor = {
  "Iced Coffee": "bg-blue-400/15 text-blue-400",
  "Non-Coffee":  "bg-green-400/15 text-green-400",
  "Soda":        "bg-purple-400/15 text-purple-400",
  "Dessert":     "bg-orange-400/15 text-orange-400",
};

export default function Products() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allProducts.filter((p) => {
    const matchCat    = filter === "All" || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-xl font-bold">Products</h2>
          <p className="text-white/35 text-sm mt-0.5">{allProducts.length} items on the menu</p>
        </div>
        <button className="bg-[#b8860b] hover:bg-yellow-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          + Add Product
        </button>
      </div>

      {/* Filters + Search */}
      <div className="flex items-center gap-4">
        <div className="flex bg-[#141414] border border-white/8 rounded-xl p-1 gap-1 flex-wrap">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150
                ${filter === c ? "bg-[#b8860b] text-white" : "text-white/50 hover:text-white"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex-1 flex items-center gap-2 bg-[#141414] border border-white/8 rounded-xl px-4 py-2.5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-white/30">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/25" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-4">
        {filtered.map((p, i) => (
          <div key={i} className="bg-[#141414] border border-white/8 rounded-2xl overflow-hidden hover:border-[#b8860b]/30 transition-all duration-200 group">
            <div className="relative h-40 bg-[#1a1a1a] overflow-hidden">
              <img src={p.img} alt={p.name} className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500" />
              {p.tag && (
                <span className="absolute top-2 left-2 bg-[#b8860b] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {p.tag}
                </span>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-white text-sm font-semibold leading-tight">{p.name}</h4>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${catColor[p.category]}`}>
                  {p.category}
                </span>
              </div>
              <p className="text-[#b8860b] font-bold text-base mb-3">{p.price}</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-white/6 hover:bg-white/12 text-white/60 hover:text-white text-xs py-1.5 rounded-lg transition-all">
                  Edit
                </button>
                <button className="flex-1 bg-red-400/8 hover:bg-red-400/15 text-red-400/60 hover:text-red-400 text-xs py-1.5 rounded-lg transition-all">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-4 py-16 text-center text-white/30 text-sm">No products found.</div>
        )}
      </div>
    </div>
  );
}
