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

// This file contains the API functions to interact with Strapi

import type { Post, Category, ApiResponse } from "@/types/strapi"

// Mock data for demonstration purposes
const mockPosts = [
  {
    id: 1,
    attributes: {
      title: "Getting Started with Next.js and Strapi",
      slug: "getting-started-with-nextjs-and-strapi",
      description: "Learn how to build a modern blog with Next.js and Strapi CMS",
      content: `
# Getting Started with Next.js and Strapi

Next.js and Strapi make a powerful combination for building modern websites and applications. In this comprehensive guide, we'll walk through setting up a complete blog with these technologies.

## What is Strapi?

Strapi is an open-source headless CMS that gives developers the freedom to choose their favorite tools and frameworks while allowing content editors to easily manage their content via a beautiful and user-friendly interface.

## Setting Up Your Strapi Backend

First, you'll need to create a new Strapi project:

\`\`\`bash
npx create-strapi-app my-project
\`\`\`

Once installed, you can create content types through the admin panel. For a blog, you might want:

- Articles (title, content, image, etc.)
- Categories
- Authors

## Connecting to Next.js

In your Next.js application, you can fetch data from your Strapi API:

\`\`\`javascript
async function getArticles() {
  const res = await fetch('http://localhost:1337/api/articles?populate=*')
  const data = await res.json()
  return data
}
\`\`\`

## Rendering Your Content

With Next.js, you can use Server Components to fetch and render your Strapi content directly:

\`\`\`jsx
export default async function Page() {
  const articles = await getArticles()

  return (
    <div>
      {articles.data.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}
\`\`\`

## Conclusion

This setup gives you a powerful, flexible foundation for your content-driven website. Strapi handles content management, while Next.js delivers a fast, SEO-friendly frontend experience.
      `,
      publishedAt: "2023-05-15T09:00:00.000Z",
      readingTime: "8 min read",
      cover: {
        data: {
          attributes: {
            url: "/placeholder.svg?height=600&width=1200",
          },
        },
      },
      categories: {
        data: [
          { id: 1, attributes: { name: "Tutorial", slug: "tutorial" } },
          { id: 2, attributes: { name: "Web Development", slug: "web-development" } },
        ],
      },
      author: {
        data: {
          attributes: {
            name: "Jane Doe",
            role: "Senior Developer",
            avatar: {
              data: {
                attributes: {
                  url: "/placeholder.svg?height=100&width=100",
                },
              },
            },
          },
        },
      },
    },
  },
  {
    id: 2,
    attributes: {
      title: "Advanced Strapi Content Modeling",
      slug: "advanced-strapi-content-modeling",
      description: "Discover best practices for structuring your content in Strapi",
      content: `
# Advanced Strapi Content Modeling

Content modeling is a crucial aspect of any CMS implementation. In Strapi, you have powerful tools to create exactly the structure you need.

## Understanding Content Types

Strapi offers two kinds of content types:

1. **Collection Types**: For content that will have multiple entries (Articles, Products)
2. **Single Types**: For content that will have only one entry (Homepage, About Page)

## Relationships

One of Strapi's strengths is how it handles relationships between content:

- One-to-One
- One-to-Many
- Many-to-Many

For example, an Article might belong to one Category (One-to-One), but have many Tags (Many-to-Many).

## Component System

Components allow you to create reusable content structures. For instance, you might create a "Hero" component with:

- Title
- Subtitle
- Background Image
- CTA Button

This component can then be used across different content types, ensuring consistency.

## Dynamic Zones

Dynamic Zones take components to the next level by allowing content editors to choose which components to use and in what order. This is perfect for page builders where you want maximum flexibility.

## Best Practices

1. **Plan your content model**: Sketch out your content types and their relationships before implementation
2. **Use components for repeatable structures**: Don't duplicate field definitions
3. **Consider the API consumer**: Structure your content in a way that makes sense for your frontend
4. **Use meaningful field names**: They'll be exposed in your API
5. **Leverage Strapi's field types**: Use the right field type for each piece of content

By following these principles, you'll create a content structure that's both powerful for developers and intuitive for content editors.
      `,
      publishedAt: "2023-06-22T14:30:00.000Z",
      readingTime: "12 min read",
      cover: {
        data: {
          attributes: {
            url: "/placeholder.svg?height=600&width=1200",
          },
        },
      },
      categories: {
        data: [
          { id: 1, attributes: { name: "Tutorial", slug: "tutorial" } },
          { id: 3, attributes: { name: "CMS", slug: "cms" } },
        ],
      },
      author: {
        data: {
          attributes: {
            name: "John Smith",
            role: "CMS Specialist",
            avatar: {
              data: {
                attributes: {
                  url: "/placeholder.svg?height=100&width=100",
                },
              },
            },
          },
        },
      },
    },
  },
  {
    id: 3,
    attributes: {
      title: "Building a Headless E-commerce Site",
      slug: "building-a-headless-ecommerce-site",
      description: "Step-by-step guide to creating an e-commerce site with Strapi and Next.js",
      content: `
# Building a Headless E-commerce Site with Strapi and Next.js

E-commerce is evolving rapidly, and headless architecture is leading the way. This guide will walk you through building a complete e-commerce solution using Strapi as your backend and Next.js for your frontend.

## Why Headless E-commerce?

Traditional e-commerce platforms often come with limitations in terms of customization and performance. A headless approach separates your content management from your presentation layer, giving you:

- Complete design freedom
- Better performance
- Flexibility to use any frontend technology
- Ability to deliver content to multiple channels (web, mobile, IoT)

## Setting Up Your Strapi E-commerce Backend

First, create a new Strapi project:

\`\`\`bash
npx create-strapi-app my-ecommerce-backend
\`\`\`

Then, create the following content types:

1. **Product**
   - Name
   - Description
   - Price
   - Images
   - SKU
   - Inventory count
   - Categories (relation)
   - Variants (component)

2. **Category**
   - Name
   - Description
   - Image

3. **Order**
   - Products (relation)
   - Customer (relation)
   - Status
   - Total price
   - Payment info

## Building Your Next.js Frontend

Create a new Next.js project:

\`\`\`bash
npx create-next-app my-ecommerce-frontend
\`\`\`

Key pages to implement:

1. Product listing page
2. Product detail page
3. Shopping cart
4. Checkout process
5. Order confirmation

## Implementing the Shopping Cart

Use React Context to manage the shopping cart state:

\`\`\`jsx
// context/CartContext.js
import { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      // Add item logic
    case 'REMOVE_ITEM':
      // Remove item logic
    // Other cases
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
\`\`\`

## Handling Payments

Integrate with a payment processor like Stripe:

\`\`\`jsx
// pages/checkout.js
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('your_stripe_public_key');

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
\`\`\`

## Conclusion

By combining Strapi's flexible content management with Next.js's powerful frontend capabilities, you can create a fast, customizable e-commerce experience that stands out from traditional solutions.
      `,
      publishedAt: "2023-07-10T10:15:00.000Z",
      readingTime: "15 min read",
      cover: {
        data: {
          attributes: {
            url: "/placeholder.svg?height=600&width=1200",
          },
        },
      },
      categories: {
        data: [
          { id: 4, attributes: { name: "E-commerce", slug: "ecommerce" } },
          { id: 2, attributes: { name: "Web Development", slug: "web-development" } },
        ],
      },
      author: {
        data: {
          attributes: {
            name: "Alex Johnson",
            role: "E-commerce Developer",
            avatar: {
              data: {
                attributes: {
                  url: "/placeholder.svg?height=100&width=100",
                },
              },
            },
          },
        },
      },
    },
  },
]

const mockCategories = [
  { id: 1, attributes: { name: "Tutorial", slug: "tutorial" } },
  { id: 2, attributes: { name: "Web Development", slug: "web-development" } },
  { id: 3, attributes: { name: "CMS", slug: "cms" } },
  { id: 4, attributes: { name: "E-commerce", slug: "ecommerce" } },
]

// Function to fetch data from Strapi API
export async function fetchAPI<T>(endpoint: string, options = {}): Promise<ApiResponse<T>> {
  // Check if we have a Strapi API URL
  const apiUrl = process.env.STRAPI_API_URL

  // If we have an API URL, fetch from the actual API
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

      const post = mockPosts.find((post) => post.attributes.slug === slug)
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
      post.attributes.title.toLowerCase().includes(query.toLowerCase()) ||
      post.attributes.description.toLowerCase().includes(query.toLowerCase()),
  )

  return { data: filteredPosts }
}

export async function getPostsByCategory(categorySlug: string): Promise<ApiResponse<Post[]>> {
  // In a real implementation, you would use Strapi's filters
  // Example: return fetchAPI(`articles?filters[categories][slug][$eq]=${categorySlug}&populate=*`)

  // For mock data, filter locally
  const filteredPosts = mockPosts.filter((post) =>
    post.attributes.categories.data.some((category) => category.attributes.slug === categorySlug),
  )

  return { data: filteredPosts }
}
