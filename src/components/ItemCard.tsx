import { MapPin, CalendarDays, ArrowUpRight } from 'lucide-react'

export interface ItemReport {
  id: number
  title: string
  category: string
  location: string
  date: string
  type: 'Lost' | 'Found'
  image: string
}

interface ItemCardProps {
  item: ItemReport
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <article className="sk-panel sk-panel-lift group p-3">

      <div className="sk-photo">
        <div className="sk-photo-inner h-48 bg-slate-200">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className={`sk-tag absolute left-3 top-3 z-10 ${
              item.type === 'Lost' ? 'sk-tag-lost' : 'sk-tag-found'
            }`}
          >
            {item.type} Item
          </span>
        </div>
      </div>

      <div className="px-2 pb-2 pt-5">

        <div className="mb-2 flex items-center justify-between">
          <span className="sk-eyebrow text-xs font-bold uppercase tracking-wider">
            {item.category}
          </span>
          <span className="sk-emboss-soft text-xs font-semibold">
            #{item.id.toString().padStart(3, '0')}
          </span>
        </div>

        <h3 className="sk-emboss mb-4 truncate text-lg font-extrabold">
          {item.title}
        </h3>

        <div className="sk-groove mb-4" />

        <div className="flex flex-col gap-2">
          <div className="sk-emboss-soft flex items-center gap-2 text-sm">
            <MapPin size={16} className="shrink-0 text-cyan-600" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="sk-emboss-soft flex items-center gap-2 text-sm">
            <CalendarDays size={16} className="shrink-0 text-blue-600" />
            {item.date}
          </div>
        </div>

        <button
          type="button"
          className="sk-btn sk-btn-steel mt-6 w-full justify-between rounded-xl px-4 py-3 text-sm"
        >
          View Details
          <ArrowUpRight size={18} />
        </button>

      </div>
    </article>
  )
}

export default ItemCard