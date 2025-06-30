import type { ZennApiResponse } from '../types/zenn';

const ZENN_API_BASE_URL = '/api/zenn'; // Vercelサーバーレス関数経由

export const fetchZennArticles = async (username: string): Promise<ZennApiResponse> => {
  try {
    const response = await fetch(`${ZENN_API_BASE_URL}?username=${username}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ZennApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Zenn APIからデータを取得中にエラーが発生しました:', error);
    throw error;
  }
}; 