import { Search, MapPin, SlidersHorizontal } from 'lucide-react'

function SearchPanel() {
  return (
    <div className="sk-panel rounded-3xl p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_auto]">

        <div className="sk-well flex items-center gap-3 px-4 py-3.5">
          <Search className="shrink-0 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="sk-well flex items-center gap-3 px-4 py-3.5">
          <MapPin className="shrink-0 text-slate-400" size={20} />
          <select className="w-full min-w-0 bg-transparent text-sm text-slate-600 outline-none">
            <option value="">All Provinces</option>
            <option>Western</option>
            <option>Central</option>
            <option>Southern</option>
            <option>Northern</option>
            <option>Eastern</option>
            <option>North Western</option>
            <option>North Central</option>
            <option>Uva</option>
            <option>Sabaragamuwa</option>
          </select>
        </div>

        <div className="sk-well flex items-center gap-3 px-4 py-3.5">
          <SlidersHorizontal className="shrink-0 text-slate-400" size={20} />
          <select className="w-full min-w-0 bg-transparent text-sm text-slate-600 outline-none">
            <option value="">All Categories</option>
            <option>Electronics</option>
            <option>Documents</option>
            <option>Accessories</option>
            <option>Bags</option>
            <option>Clothing</option>
            <option>Other</option>
          </select>
        </div>

        <button type="button" className="sk-btn rounded-2xl px-8 py-3.5 text-sm">
          <Search size={18} />
          Search
        </button>
      </div>

      <div className="sk-groove mt-6" />

      <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-3 text-xs">
        <span className="sk-emboss-soft font-bold">Popular searches:</span>
        {['Mobile phone', 'Wallet', 'Student ID', 'Laptop'].map((tag) => (
          <button key={tag} type="button" className="sk-pill px-3.5 py-1.5 font-bold">
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchPanel