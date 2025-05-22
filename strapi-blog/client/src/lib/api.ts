// export async function fetchAPI(endpoint: string, options = {}) {
//   const defaultOptions = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }

//   const mergedOptions = {
//     ...defaultOptions,
//     ...options,
//   }

//   const apiUrl = process.env.STRAPI_API_URL || "http://localhost:1337"
//   const response = await fetch(`${apiUrl}/api/${endpoint}`, mergedOptions)

//   if (!response.ok) {
//     throw new Error(`API error: ${response.status}`)
//   }

//   const data = await response.json()
//   return data
// }


"use client"

import { env } from "@/env"
// This file contains the API functions to interact with Strapi

import type { Post, Category, ApiResponse } from "@/types/strapi"
import { mockCategories, mockPosts } from "./mocks";

// Function to fetch data from Strapi API
export async function fetchAPI<T>(endpoint: string, options = {}): Promise<ApiResponse<T>> {
  const apiUrl = env.STRAPI_API_URL;

  if (apiUrl) {
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const mergedOptions = {
      ...defaultOptions,
      ...options,
    }

    try {
      const response = await fetch(`${apiUrl}/api/${endpoint}`, mergedOptions)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching from Strapi API:", error)
      // Fall back to mock data if API request fails
      return getMockData(endpoint) as ApiResponse<T>
    }
  }

  // If no API URL, use mock data
  return getMockData(endpoint) as ApiResponse<T>
}

// Helper function to get mock data based on endpoint
function getMockData(endpoint: string) {
  if (endpoint.startsWith("articles")) {
    if (endpoint.includes("filters[slug]")) {
      // Extract slug from endpoint
      const slugMatch = endpoint.match(/filters\[slug\]\[\$eq\]=([^&]+)/)
      const slug = slugMatch ? slugMatch[1] : ""

      const post = mockPosts.find((post) => post.slug === slug)
      return { data: post ? [post] : [] }
    }
    return { data: mockPosts }
  }

  if (endpoint.startsWith("categories")) {
    return { data: mockCategories }
  }

  return { data: [] }
}

// API functions
export async function getAllPosts(): Promise<ApiResponse<Post[]>> {
  return fetchAPI<Post[]>("articles?populate=*")
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const response = await fetchAPI<Post[]>(`articles?filters[slug][$eq]=${slug}&populate=*`)
  return response.data[0] || null
}

export async function getAllCategories(): Promise<ApiResponse<Category[]>> {
  return fetchAPI<Category[]>("categories")
}

export async function searchPosts(query: string): Promise<ApiResponse<Post[]>> {
  // In a real implementation, you would use Strapi's filters
  // Example: return fetchAPI(`articles?filters[title][$containsi]=${query}&populate=*`)

  // For mock data, filter locally
  const filteredPosts = mockPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description.toLowerCase().includes(query.toLowerCase()),
  )

  return { data: filteredPosts } as ApiResponse<Post[]>;
}

export async function getPostsByCategory(categorySlug: string): Promise<ApiResponse<Post[]>> {
  // In a real implementation, you would use Strapi's filters
  // Example: return fetchAPI(`articles?filters[categories][slug][$eq]=${categorySlug}&populate=*`)

  // For mock data, filter locally
  const filteredPosts = mockPosts.filter((post) =>
    post.categories.data.some((category) => category.slug === categorySlug),
  )

  return { data: filteredPosts } as ApiResponse<Post[]>;
}
