import { useEffect, useState } from 'react'

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

  useEffect(() => {
    let isMounted = true

    const fetchItems = async () => {
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

        if (!isMounted) return

        setItems(response.items)
        setTotalItems(response.totalItems)
        setTotalPages(response.totalPages)
      } catch (error) {
        console.error('Fetch items error:', error)

        if (!isMounted) return

        setItems([])
        setTotalItems(0)
        setTotalPages(1)

        setError('Unable to load reports. Please try again.')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchItems()

    return () => {
      isMounted = false
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

  return {
    items,
    isLoading,
    error,
    totalItems,
    totalPages
  }
}