import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  MapPin,
  CalendarDays,
  Package,
  User,
  ArrowLeft,
  AlertCircle
} from 'lucide-react'

import {
  getItemById,
  type Item
} from '../services/item.service'

function ItemDetails() {
  const { id } = useParams<{ id: string }>()

  const [item, setItem] = useState<Item | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchItem = async () => {
      if (!id) {
        setError('Invalid item ID.')
        setIsLoading(false)
        return
      }

      try {
        const response = await getItemById(id)

        if (isMounted) {
          setItem(response)
        }
      } catch (error) {
        console.error('Item details error:', error)

        if (isMounted) {
          setError('Unable to load item details.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void fetchItem()

    return () => {
      isMounted = false
    }
  }, [id])

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading item details...</p>
      </main>
    )
  }

  if (error || !item) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4">
        <AlertCircle size={40} />

        <h2 className="mt-4 text-xl font-semibold">
          {error || 'Item not found'}
        </h2>

        <Link to="/" className="mt-6">
          Back to Home
        </Link>
      </main>
    )
  }

  const reporterName =
    typeof item.user === 'object'
      ? item.user?.name
      : undefined

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-5xl">

        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Back to Reports
        </Link>

        <div className="sk-panel overflow-hidden rounded-2xl">

          {item.imageUrl && (
            <div className="h-72 w-full overflow-hidden md:h-96">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="space-y-8 p-6 md:p-10">

            <div>
              <div className="mb-4 flex flex-wrap gap-3">

                <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">
                  {item.type.toUpperCase()} ITEM
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                  {item.status.toUpperCase()}
                </span>

              </div>

              <h1 className="text-3xl font-bold md:text-4xl">
                {item.name}
              </h1>

              <p className="mt-3 text-sm opacity-70">
                {item.category}
              </p>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h2 className="mb-4 text-xl font-semibold">
                Description
              </h2>

              <p className="leading-7 opacity-80">
                {item.description}
              </p>
            </div>

            <div className="border-t border-white/10 pt-6">

              <h2 className="mb-5 text-xl font-semibold">
                Item Information
              </h2>

              <div className="grid gap-6 md:grid-cols-2">

                <div className="flex items-start gap-3">
                  <Package size={20} />

                  <div>
                    <p className="text-sm opacity-60">Category</p>
                    <p className="font-medium">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarDays size={20} />

                  <div>
                    <p className="text-sm opacity-60">
                      {item.type === 'lost' ? 'Date Lost' : 'Date Found'}
                    </p>

                    <p className="font-medium">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="border-t border-white/10 pt-6">

              <h2 className="mb-5 text-xl font-semibold">
                Location Information
              </h2>

              <div className="space-y-4">

                <div className="flex items-start gap-3">
                  <MapPin size={20} />

                  <div>
                    <p className="text-sm opacity-60">Province</p>
                    <p>{item.province}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={20} />

                  <div>
                    <p className="text-sm opacity-60">District</p>
                    <p>{item.district}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={20} />

                  <div>
                    <p className="text-sm opacity-60">City / Locality</p>
                    <p>{item.city}</p>
                  </div>
                </div>

                {item.specificPlace && (
                  <div className="flex items-start gap-3">
                    <MapPin size={20} />

                    <div>
                      <p className="text-sm opacity-60">Specific Place</p>
                      <p>{item.specificPlace}</p>
                    </div>
                  </div>
                )}

              </div>
            </div>

            <div className="border-t border-white/10 pt-6">

              <h2 className="mb-5 text-xl font-semibold">
                Reporter Information
              </h2>

              <div className="flex items-center gap-3">
                <User size={22} />

                <div>
                  <p className="text-sm opacity-60">Reported by</p>
                  <p className="font-medium">
                    {reporterName || 'Registered user'}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm opacity-60">
                Report created: {new Date(item.createdAt).toLocaleDateString()}
              </p>

            </div>

          </div>
        </div>
      </div>
    </main>
  )
}

export default ItemDetails