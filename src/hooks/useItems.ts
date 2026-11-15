import { useCallback, useEffect, useState } from "react"

import {
  getItems,
  type Item,
  type ItemFilters
} from "../services/item.service"

export function useItems(filters: ItemFilters) {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const fetchItems = useCallback(async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await getItems(filters)

      setItems(response.items)
      setTotalItems(response.totalItems)
      setTotalPages(response.totalPages)
    } catch (error) {
      console.error("Fetch items error:", error)

      setItems([])
      setTotalItems(0)
      setTotalPages(1)
      setError("Unable to load reports. Please try again.")
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
    filters.status,
    filters.page,
    filters.limit
  ])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  return {
    items,
    isLoading,
    error,
    totalItems,
    totalPages,
    refetch: fetchItems
  }
}