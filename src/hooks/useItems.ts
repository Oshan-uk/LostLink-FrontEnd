import { useCallback, useEffect, useState } from 'react'

import {
  getItems,
  type Item,
  type ItemFilters,
} from '../services/item.service'

export function useItems(filters: ItemFilters) {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const fetchItems = useCallback(async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await getItems(filters)

      setItems(response.items)
      setTotalPages(response.pagination?.totalPages ?? 1)
      setTotalItems(response.pagination?.totalItems ?? response.items.length)
    } catch {
      setItems([])
      setError('Unable to load reports. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [
    filters.search,
    filters.type,
    filters.category,
    filters.province,
    filters.district,
    filters.city,
    filters.page,
    filters.limit,
  ])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  return {
    items,
    isLoading,
    error,
    totalPages,
    totalItems,
    refetch: fetchItems,
  }
}