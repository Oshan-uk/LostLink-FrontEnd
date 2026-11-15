import { useCallback, useEffect, useRef, useState } from 'react'

import {
  getItems,
  type Item,
  type ItemFilters
} from '../services/item.service'

export function useItems(filters: ItemFilters) {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const requestId = useRef(0)

  const {
    search,
    type,
    category,
    province,
    district,
    city,
    status,
    page,
    limit
  } = filters

  const fetchItems = useCallback(async () => {
    const currentRequest = ++requestId.current

    setIsLoading(true)
    setError('')

    try {
      const response = await getItems({
        search,
        type,
        category,
        province,
        district,
        city,
        status,
        page,
        limit
      })

      if (currentRequest !== requestId.current) return

      setItems(response.items)
      setTotalItems(response.totalItems)
      setTotalPages(response.totalPages)
    } catch (error) {
      if (currentRequest !== requestId.current) return

      console.error('Fetch items error:', error)

      setItems([])
      setTotalItems(0)
      setTotalPages(1)
      setError('Unable to load reports. Please try again.')
    } finally {
      if (currentRequest === requestId.current) {
        setIsLoading(false)
      }
    }
  }, [
    search,
    type,
    category,
    province,
    district,
    city,
    status,
    page,
    limit
  ])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void fetchItems()
    }, 0)

    return () => {
      clearTimeout(timeoutId)
      requestId.current += 1
    }
  }, [fetchItems])

  const refetch = useCallback(async () => {
    await fetchItems()
  }, [fetchItems])

  return {
    items,
    isLoading,
    error,
    totalItems,
    totalPages,
    refetch
  }
}
