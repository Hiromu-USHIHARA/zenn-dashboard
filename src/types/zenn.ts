export interface ZennUser {
  id: number;
  username: string;
  name: string;
  avatar_small_url: string;
}

export interface ZennArticle {
  id: number;
  post_type: string;
  title: string;
  slug: string;
  comments_count: number;
  liked_count: number;
  bookmarked_count: number;
  body_letters_count: number;
  article_type: string;
  emoji: string;
  is_suspending_private: boolean;
  published_at: string;
  body_updated_at: string;
  source_repo_updated_at: string | null;
  pinned: boolean;
  path: string;
  user: ZennUser;
  publication: any | null;
}

export interface ZennApiResponse {
  articles: ZennArticle[];
  next_page: string | null;
  total_count: number | null;
} 