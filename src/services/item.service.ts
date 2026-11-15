import api from '../lib/api'

export interface Item {
  _id: string
  name: string
  category: string
  description: string
  type: 'lost' | 'found'
  province: string
  district: string
  city: string
  specificPlace?: string
  date: string
  imageUrl?: string
  status: 'active' | 'returned'
  createdAt: string
  updatedAt: string
}

export interface ItemFilters {
  search?: string
  type?: 'lost' | 'found' | ''
  category?: string
  province?: string
  district?: string
  city?: string
  page?: number
  limit?: number
}

export interface ItemListResponse {
  success: boolean
  message?: string
  items: Item[]
  pagination?: {
    currentPage: number
    totalPages: number
    totalItems: number
    limit: number
  }
}

export const getItems = async (
  filters: ItemFilters = {}
): Promise<ItemListResponse> => {
  const response = await api.get<ItemListResponse>('/items', {
    params: filters,
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