import { useState } from "react"

import {
  Search,
  MapPin,
  SlidersHorizontal,
  RotateCcw
} from "lucide-react"

export interface SearchFilters {
  search: string
  province: string
  category: string
  type: "" | "lost" | "found"
}

interface SearchPanelProps {
  onSearch: (filters: SearchFilters) => void
}

const popularSearches = [
  "Mobile phone",
  "Wallet",
  "Student ID",
  "Laptop"
]

const provinces = [
  "Western",
  "Central",
  "Southern",
  "Northern",
  "Eastern",
  "North Western",
  "North Central",
  "Uva",
  "Sabaragamuwa"
]

const categories = [
  "Electronics",
  "Documents",
  "Accessories",
  "Bags",
  "Clothing",
  "Other"
]

function SearchPanel({ onSearch }: SearchPanelProps) {
  const [search, setSearch] = useState("")
  const [province, setProvince] = useState("")
  const [category, setCategory] = useState("")
  const [type, setType] = useState<"" | "lost" | "found">("")

  const handleSearch = () => {
    onSearch({
      search: search.trim(),
      province,
      category,
      type
    })
  }

  const handleReset = () => {
    setSearch("")
    setProvince("")
    setCategory("")
    setType("")

    onSearch({
      search: "",
      province: "",
      category: "",
      type: ""
    })
  }

  const handlePopularSearch = (value: string) => {
    setSearch(value)

    onSearch({
      search: value,
      province,
      category,
      type
    })
  }

  return (
    <div className="sk-panel rounded-3xl p-4 sm:p-5">

      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSearch()
        }}
      >

        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_auto]">

          <div className="sk-well flex items-center gap-3 px-4 py-3.5">

            <Search
              className="shrink-0 text-slate-400"
              size={20}
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="What are you looking for?"
              className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />

          </div>

          <div className="sk-well flex items-center gap-3 px-4 py-3.5">

            <MapPin
              className="shrink-0 text-slate-400"
              size={20}
            />

            <select
              value={province}
              onChange={(event) => setProvince(event.target.value)}
              className="w-full min-w-0 bg-transparent text-sm text-slate-600 outline-none"
            >

              <option value="">All Provinces</option>

              {provinces.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}

            </select>

          </div>

          <div className="sk-well flex items-center gap-3 px-4 py-3.5">

            <SlidersHorizontal
              className="shrink-0 text-slate-400"
              size={20}
            />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full min-w-0 bg-transparent text-sm text-slate-600 outline-none"
            >

              <option value="">All Categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}

            </select>

          </div>

          <button
            type="submit"
            className="sk-btn rounded-2xl px-8 py-3.5 text-sm"
          >
            <Search size={18} />
            Search
          </button>

        </div>

        <div className="sk-groove mt-6" />

        <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-3 text-xs">

          <span className="sk-emboss-soft font-bold">
            Popular searches:
          </span>

          {popularSearches.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handlePopularSearch(tag)}
              className="sk-pill px-3.5 py-1.5 font-bold"
            >
              {tag}
            </button>
          ))}

        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

          <div className="flex flex-wrap items-center gap-2">

            <span className="sk-emboss-soft text-xs font-bold">
              Report type:
            </span>

            <button
              type="button"
              onClick={() => setType("")}
              className={`sk-pill px-3 py-1.5 text-xs font-bold ${type === "" ? "sk-pressed" : ""}`}
            >
              All
            </button>

            <button
              type="button"
              onClick={() => setType("lost")}
              className={`sk-pill px-3 py-1.5 text-xs font-bold ${type === "lost" ? "sk-pressed" : ""}`}
            >
              Lost
            </button>

            <button
              type="button"
              onClick={() => setType("found")}
              className={`sk-pill px-3 py-1.5 text-xs font-bold ${type === "found" ? "sk-pressed" : ""}`}
            >
              Found
            </button>

          </div>

          <button
            type="button"
            onClick={handleReset}
            className="sk-emboss-soft flex items-center gap-2 text-xs font-bold transition-colors hover:text-cyan-700"
          >
            <RotateCcw size={14} />
            Reset Filters
          </button>

        </div>

      </form>

    </div>
  )
}

export default SearchPanel