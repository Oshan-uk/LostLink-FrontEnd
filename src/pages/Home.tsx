import { useState } from "react"

import {
  Smartphone,
  FileText,
  Watch,
  BriefcaseBusiness,
  Shirt,
  Package,
  ShieldCheck,
  Users,
  MapPin,
  ArrowRight,
  LoaderCircle,
  RefreshCw
} from "lucide-react"

import { Link } from "react-router-dom"

import SearchPanel, {
  type SearchFilters
} from "../components/SearchPanel"

import ItemCard from "../components/ItemCard"

import CategoryCard from "../components/CategoryCard"
import HowItWorks from "../components/HowItWorks"
import Screws from "../components/Screws"

import { useItems } from "../hooks/useItems"

const categories = [
  {
    title: "Electronics",
    description: "Phones, laptops and gadgets",
    icon: Smartphone,
    accent: "cyan" as const
  },
  {
    title: "Documents",
    description: "IDs, licenses and certificates",
    icon: FileText,
    accent: "blue" as const
  },
  {
    title: "Accessories",
    description: "Watches, wallets and jewellery",
    icon: Watch,
    accent: "lime" as const
  },
  {
    title: "Bags",
    description: "Backpacks and handbags",
    icon: BriefcaseBusiness,
    accent: "cyan" as const
  },
  {
    title: "Clothing",
    description: "Clothes and personal wear",
    icon: Shirt,
    accent: "blue" as const
  },
  {
    title: "Other",
    description: "Anything else you have lost or found",
    icon: Package,
    accent: "lime" as const
  }
]

const trust = [
  {
    icon: ShieldCheck,
    label: "Community Powered",
    color: "text-cyan-300"
  },
  {
    icon: MapPin,
    label: "Islandwide Platform",
    color: "text-blue-300"
  },
  {
    icon: Users,
    label: "Built for Everyone",
    color: "text-lime-300"
  }
]

function Home() {
  const [filters, setFilters] = useState<SearchFilters>({
    search: "",
    province: "",
    category: "",
    type: ""
  })

  const {
    items,
    isLoading,
    error,
    totalItems,
    refetch
  } = useItems({
    search: filters.search,
    province: filters.province,
    category: filters.category,
    type: filters.type,
    status: "active",
    page: 1,
    limit: 6
  })

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters)

    document.getElementById("recent")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }

  const handleCategoryClick = (category: string) => {
    const newFilters = {
      search: "",
      province: "",
      category,
      type: "" as const
    }

    setFilters(newFilters)

    document.getElementById("recent")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }

  return (
    <main>

      <section className="sk-hero relative">

        <div className="mx-auto max-w-7xl px-5 pb-32 pt-20 sm:pb-36 sm:pt-24 lg:px-8 lg:pb-40 lg:pt-32">

          <div className="mx-auto max-w-3xl text-center">

            <div className="sk-well-dark mb-8 inline-flex max-w-full items-center gap-2.5 rounded-full px-4 py-2 text-[11px] font-bold tracking-wide text-cyan-300 sm:text-xs">

              <span className="sk-led" />

              RECONNECTING PEOPLE ACROSS SRI LANKA

            </div>

            <h1 className="sk-title-dark font-['Plus_Jakarta_Sans'] text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">

              Lost Something?

              <br />

              <span className="text-cyan-300">
                Let's Find It Together.
              </span>

            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">

              A smarter way to report lost items, discover found belongings
              and reconnect people across Sri Lanka.

            </p>

            <div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">

              <Link
                to="/register"
                className="sk-btn px-8 py-4"
              >
                Report an Item
                <ArrowRight size={18} />
              </Link>

              <a
                href="#recent"
                className="sk-btn sk-btn-dark px-8 py-4"
              >
                Explore Reports
              </a>

            </div>

            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-300">

              {trust.map(({ icon: Icon, label, color }) => (

                <div
                  key={label}
                  className="flex items-center gap-2.5"
                >

                  <span className="sk-well-dark flex h-9 w-9 items-center justify-center">

                    <Icon
                      size={17}
                      className={color}
                    />

                  </span>

                  {label}

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      <section
        id="search"
        className="relative z-10 mx-auto -mt-16 max-w-7xl px-5 sm:-mt-24 lg:px-8"
      >

        <SearchPanel onSearch={handleSearch} />

      </section>

      <section
        id="categories"
        className="py-20 sm:py-24"
      >

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <span className="sk-eyebrow text-sm font-bold uppercase tracking-widest">
                Explore by category
              </span>

              <h2 className="sk-emboss mt-3 font-['Plus_Jakarta_Sans'] text-3xl font-extrabold">
                What Are You Looking For?
              </h2>

              <p className="sk-emboss-soft mt-3">
                Browse reports by item category.
              </p>

            </div>

            <span className="sk-lcd w-fit px-3 py-1.5 text-sm font-bold tracking-widest">
              06 CATEGORIES
            </span>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {categories.map((category) => (

              <button
                key={category.title}
                type="button"
                onClick={() => handleCategoryClick(category.title)}
                className="text-left"
              >

                <CategoryCard
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                  accent={category.accent}
                />

              </button>

            ))}

          </div>

        </div>

      </section>

      <section
        id="recent"
        className="sk-tray scroll-mt-24 py-20 sm:py-24"
      >

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <span className="sk-eyebrow text-sm font-bold uppercase tracking-widest">
                Community reports
              </span>

              <h2 className="sk-emboss mt-3 font-['Plus_Jakarta_Sans'] text-3xl font-extrabold">
                Recent Lost & Found Items
              </h2>

              <p className="sk-emboss-soft mt-3">

                {filters.search || filters.category || filters.province || filters.type
                  ? "Matching reports from the LostLink community."
                  : "Discover recently reported belongings."}

              </p>

              {!isLoading && !error && (

                <p className="sk-emboss-soft mt-2 text-xs font-bold">

                  {totalItems} {totalItems === 1 ? "report" : "reports"} found

                </p>

              )}

            </div>

            <button
              type="button"
              onClick={refetch}
              disabled={isLoading}
              className="sk-btn sk-btn-steel flex w-fit items-center gap-2 rounded-xl px-5 py-2.5 text-sm disabled:opacity-50"
            >

              <RefreshCw
                size={16}
                className={isLoading ? "animate-spin" : ""}
              />

              Refresh Reports

            </button>

          </div>

          {isLoading ? (

            <div className="flex min-h-64 flex-col items-center justify-center gap-4">

              <LoaderCircle
                size={38}
                className="animate-spin text-cyan-600"
              />

              <p className="sk-emboss-soft text-sm font-semibold">
                Loading recent reports...
              </p>

            </div>

          ) : error ? (

            <div className="sk-panel flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl p-8 text-center">

              <p className="sk-emboss text-lg font-bold">
                Unable to load reports
              </p>

              <p className="sk-emboss-soft text-sm">
                {error}
              </p>

              <button
                type="button"
                onClick={refetch}
                className="sk-btn rounded-xl px-6 py-3 text-sm"
              >
                Try Again
              </button>

            </div>

          ) : items.length === 0 ? (

            <div className="sk-panel flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl p-8 text-center">

              <Package
                size={42}
                className="text-cyan-600"
              />

              <h3 className="sk-emboss text-xl font-extrabold">
                No Reports Found
              </h3>

              <p className="sk-emboss-soft max-w-md text-sm leading-6">
                We couldn't find any reports matching your search.
                Try changing your filters or resetting your search.
              </p>

              <button
                type="button"
                onClick={() => handleSearch({
                  search: "",
                  province: "",
                  category: "",
                  type: ""
                })}
                className="sk-btn rounded-xl px-6 py-3 text-sm"
              >
                Clear Filters
              </button>

            </div>

          ) : (

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

              {items.map((item) => (

                <ItemCard
                  key={item._id}
                  item={item}
                />

              ))}

            </div>

          )}

          {!isLoading && !error && totalItems > items.length && (

            <div className="mt-10 text-center">

              <p className="sk-emboss-soft text-sm">
                Showing {items.length} of {totalItems} reports.
              </p>

            </div>

          )}

        </div>

      </section>

      <HowItWorks />

      <section className="px-5 pb-20 sm:pb-24 lg:px-8">

        <div className="sk-blue-panel relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-7 py-16 text-center sm:px-16">

          <div className="relative">

            <h2 className="sk-title-dark font-['Plus_Jakarta_Sans'] text-3xl font-extrabold sm:text-4xl">

              Every Lost Item Deserves

              <br className="hidden sm:block" />

              a Chance to Be Found.

            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-cyan-50">

              Join the community. Report what you have lost or found
              and help someone reconnect with what matters.

            </p>

            <Link
              to="/register"
              className="sk-btn sk-btn-steel mt-9 px-8 py-4"
            >

              Join LostLink

              <ArrowRight size={18} />

            </Link>

          </div>

          <Screws />

        </div>

      </section>

    </main>
  )
}

export default Home