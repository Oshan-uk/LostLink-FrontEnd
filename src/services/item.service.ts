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



export interface ItemFormData {
  name: string
  category: string
  description: string
  province: string
  district: string
  city: string
  specificPlace?: string
  date: string
  imageUrl?: string
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

export interface ItemResponse {
  success: boolean
  message: string
  item: Item
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
  const response = await api.get<ItemResponse>(`/items/${id}`)

  return response.data.item
}



export const createLostItem = async (
  itemData: ItemFormData
): Promise<ItemResponse> => {
  const response = await api.post<ItemResponse>(
    "/items/lost",
    itemData
  )

  return response.data
}



export const createFoundItem = async (
  itemData: ItemFormData
): Promise<ItemResponse> => {
  const response = await api.post<ItemResponse>(
    "/items/found",
    itemData
  )

  return response.data
}