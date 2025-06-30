import type { ZennApiResponse } from '../types/zenn';

const ZENN_API_BASE_URL = '/zenn-api'; // プロキシ経由

export const fetchZennArticles = async (username: string): Promise<ZennApiResponse> => {
  try {
    const response = await fetch(`${ZENN_API_BASE_URL}/articles?username=${username}`);
    
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