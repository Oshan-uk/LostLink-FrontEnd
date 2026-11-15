import {
  MapPin,
  CalendarDays,
  ArrowUpRight
} from "lucide-react"

import { Link } from "react-router-dom"

import type { Item } from "../services/item.service"

interface ItemCardProps {
  item: Item
}

function ItemCard({ item }: ItemCardProps) {
  const formattedDate = new Date(item.date).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  )

  const location = [
    item.city,
    item.district,
    item.province
  ]
    .filter(Boolean)
    .join(", ")

  const image =
    item.imageUrl ||
    "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800"

  return (
    <article className="sk-panel sk-panel-lift group p-3">

      <div className="sk-photo">

        <div className="sk-photo-inner relative h-48 bg-slate-200">

          <img
            src={image}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <span
            className={`sk-tag absolute left-3 top-3 z-10 ${
              item.type === "lost"
                ? "sk-tag-lost"
                : "sk-tag-found"
            }`}
          >
            {item.type === "lost" ? "Lost" : "Found"} Item
          </span>

          {item.status === "returned" && (
            <span className="sk-tag absolute right-3 top-3 z-10">
              Returned
            </span>
          )}

        </div>

      </div>

      <div className="px-2 pb-2 pt-5">

        <div className="mb-2 flex items-center justify-between">

          <span className="sk-eyebrow text-xs font-bold uppercase tracking-wider">
            {item.category}
          </span>

          <span className="sk-emboss-soft text-xs font-semibold">
            #{item._id.slice(-6).toUpperCase()}
          </span>

        </div>

        <h3 className="sk-emboss mb-4 truncate text-lg font-extrabold">
          {item.name}
        </h3>

        <div className="sk-groove mb-4" />

        <div className="flex flex-col gap-2">

          <div className="sk-emboss-soft flex items-center gap-2 text-sm">

            <MapPin
              size={16}
              className="shrink-0 text-cyan-600"
            />

            <span className="truncate">
              {location}
            </span>

          </div>

          <div className="sk-emboss-soft flex items-center gap-2 text-sm">

            <CalendarDays
              size={16}
              className="shrink-0 text-blue-600"
            />

            {formattedDate}

          </div>

        </div>

        <Link
          to={`/items/${item._id}`}
          className="sk-btn sk-btn-steel mt-6 w-full justify-between rounded-xl px-4 py-3 text-sm"
        >
          View Details
          <ArrowUpRight size={18} />
        </Link>

      </div>

    </article>
  )
}

export default ItemCard