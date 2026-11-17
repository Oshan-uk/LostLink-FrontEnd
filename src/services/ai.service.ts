import api from "../lib/api";

export interface AIChatItem {
  id: string;
  name: string;
  category: string;
  description: string;
  type: "lost" | "found";
  province: string;
  district: string;
  city: string;
  specificPlace?: string;
  date: string;
  imageUrl?: string;
}

export interface AIChatResponse {
  success: boolean;
  reply: string;
  items: AIChatItem[];
}

export interface AIChatRequest {
  message: string;
}

export const sendAIMessage = async (
  message: string,
): Promise<AIChatResponse> => {
  const response = await api.post<AIChatResponse>(
    "/ai/chat",
    {
      message,
    },
  );

  return response.data;
};