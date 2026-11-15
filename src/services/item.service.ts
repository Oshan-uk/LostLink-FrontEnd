import api from "../lib/api"

export interface Item {
  _id: string
  name: string
  category: string
  description: string
  type: "lost" | "found"
  province: string
  district: string
  city: string
  specificPlace?: string
  date: string
  imageUrl?: string
  status: "active" | "returned"
  user?: {
    _id?: string
    name: string
  } | string
  createdAt: string
  updatedAt: string
}

export interface ItemFilters {
  search?: string
  type?: "lost" | "found" | ""
  category?: string
  province?: string
  district?: string
  city?: string
  status?: "active" | "returned" | "all"
  page?: number
  limit?: number
}

export interface ItemListResponse {
  success: boolean
  message?: string
  totalItems: number
  currentPage: number
  totalPages: number
  items: Item[]
}

export const getItems = async (
  filters: ItemFilters = {}
): Promise<ItemListResponse> => {
  const response = await api.get<ItemListResponse>("/items", {
    params: filters
  })

  return response.data
}

export const getItemById = async (
  id: string
): Promise<Item> => {
  const response = await api.get<{
    success: boolean
    item: Item
  }>(`/items/${id}`)

  return response.data.item
}