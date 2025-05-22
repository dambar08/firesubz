// Type definitions for Strapi API responses

export interface StrapiImage {
  data: {
    attributes: {
      url: string
      alternativeText?: string
      caption?: string
      width?: number
      height?: number
    }
  } | null
}

export interface Category {
  id: number
  attributes: {
    name: string
    slug: string
    description?: string
  }
}

export interface Author {
  data: {
    attributes: {
      name: string
      role?: string
      bio?: string
      avatar: StrapiImage
    }
  }
}

export interface Post {
  id: number
  attributes: {
    title: string
    slug: string
    description: string
    content: string
    publishedAt: string
    readingTime: string
    cover: StrapiImage
    categories: {
      data: Category[]
    }
    author: Author
  }
}

export interface ApiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
