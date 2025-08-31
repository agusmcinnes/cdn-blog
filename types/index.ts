export interface Category {
  id: string
  name: string
  slug: string
}

export interface Post {
  id: string
  title: string
  description: string
  content?: string
  youtube_url?: string
  published: boolean
  created_at: string
  updated_at: string
  categories?: Category
}
