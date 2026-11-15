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
  user: string | {
    _id: string
    name: string
  }
  status: "active" | "returned"
  createdAt: string
  updatedAt: string
}

export interface ItemResponse {
  success: boolean
  item: Item
  message: string
}

export interface ItemsResponse {
  success: boolean
  totalItems: number
  currentPage: number
  totalPages: number
  items: Item[]
}

export interface CreateItemData {
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

export const getAllItems = async (
  params?: Record<string, string | number>
): Promise<ItemsResponse> => {
  const response = await api.get<ItemsResponse>(
    "/items",
    { params }
  )

  return response.data
}

export const getItemById = async (
  id: string
): Promise<ItemResponse> => {
  const response = await api.get<ItemResponse>(
    `/items/${id}`
  )

  return response.data
}

export const createLostItem = async (
  data: CreateItemData
): Promise<ItemResponse> => {
  const response = await api.post<ItemResponse>(
    "/items/lost",
    data
  )

  return response.data
}

export const createFoundItem = async (
  data: CreateItemData
): Promise<ItemResponse> => {
  const response = await api.post<ItemResponse>(
    "/items/found",
    data
  )

  return response.data
}

export const getMyItems = async (): Promise<{
  success: boolean
  totalItems: number
  items: Item[]
}> => {
  const response = await api.get("/items/mine")

  return response.data
}

export const updateItem = async (
  id: string,
  data: Partial<CreateItemData>
): Promise<ItemResponse> => {
  const response = await api.patch<ItemResponse>(
    `/items/${id}`,
    data
  )

  return response.data
}

export const deleteItem = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/items/${id}`)

  return response.data
}

export const markItemReturned = async (
  id: string
): Promise<ItemResponse> => {
  const response = await api.patch<ItemResponse>(
    `/items/${id}/returned`
  )

  return response.data
}