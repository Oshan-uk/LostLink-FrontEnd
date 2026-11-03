import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'

type Accent = 'cyan' | 'blue' | 'lime'

interface CategoryCardProps {
  title: string
  description: string
  icon: LucideIcon
  accent?: Accent
}

const gems: Record<Accent, string> = {
  cyan: 'sk-gem',
  blue: 'sk-gem sk-gem-blue',
  lime: 'sk-gem sk-gem-lime',
}

function CategoryCard({ title, description, icon: Icon, accent = 'cyan' }: CategoryCardProps) {
  return (
    <button
      type="button"
      className="sk-panel sk-panel-lift group flex w-full items-center gap-4 p-4 text-left sm:p-5"
    >
      <span className={`${gems[accent]} h-14 w-14`}>
        <Icon size={25} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="sk-emboss block font-extrabold">{title}</span>
        <span className="sk-emboss-soft mt-1 block text-xs leading-snug">{description}</span>
      </span>

      <span className="sk-knob h-9 w-9 transition-colors group-hover:text-cyan-700">
        <ArrowUpRight size={17} />
      </span>
    </button>
  )
}

export default CategoryCard