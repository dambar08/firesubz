import type { Category, Post } from "@/types/strapi";

// Mock data for demonstration purposes
const imageFormats = {
  thumbnail: {
    name: "thumbnail_a-bug-is-becoming-a-meme-on-the-internet",
    hash: "thumbnail_a_bug_is_becoming_a_meme_on_the_internet_58d4bc0007",
    ext: ".svg",
    mime: "image/svg+xml",
    path: null,
    width: 234,
    height: 156,
    size: 6.73,
    sizeInBytes: 6728,
    url: "/placeholder.svg?height=156&width=234",
  },
  medium: {
    name: "medium_a-bug-is-becoming-a-meme-on-the-internet",
    hash: "medium_a_bug_is_becoming_a_meme_on_the_internet_58d4bc0007",
    ext: ".svg",
    mime: "image/svg+xml",
    path: null,
    width: 750,
    height: 500,
    size: 33.59,
    sizeInBytes: 33590,
    url: "/placeholder.svg?height=750&width=234",
  },
  small: {
    name: "small_a-bug-is-becoming-a-meme-on-the-internet",
    hash: "small_a_bug_is_becoming_a_meme_on_the_internet_58d4bc0007",
    ext: ".svg",
    mime: "image/svg+xml",
    path: null,
    width: 500,
    height: 333,
    size: 19.25,
    sizeInBytes: 19245,
    url: "/placeholder.svg?height=333&width=500",
  },
  large: {
    name: "large_a-bug-is-becoming-a-meme-on-the-internet",
    hash: "large_a_bug_is_becoming_a_meme_on_the_internet_58d4bc0007",
    ext: ".svg",
    mime: "image/svg+xml",
    path: null,
    width: 1000,
    height: 666,
    size: 50.97,
    sizeInBytes: 50972,
    url: "/placeholder.svg?height=666&width=1000",
  },
};
export const mockPosts = [
  {
    id: 1,
    documentId: "yvhen3qqoc48ytbkdy9cmy78",
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
      url: "/placeholder.svg?height=600&width=1200",
      name: "Placeholder",
      formats: imageFormats,
    },
    category: [
      { id: 1, documentId: "", name: "Tutorial", slug: "tutorial" },
      {
        id: 2,
        documentId: "",
        name: "Web Development",
        slug: "web-development",
      },
    ],

    author: {
      id: 1,
      documentId: "",
      name: "Jane Doe",
      email: "",
      role: "Senior Developer",
      avatar: {
        name: "",
        url: "/placeholder.svg?height=100&width=100",
        formats: imageFormats,
      },
    },
  },
  {
    id: 2,
    documentId: "yvhen3oooc48ytbkdy9cmy78",
    title: "Advanced Strapi Content Modeling",
    slug: "advanced-strapi-content-modeling",
    description:
      "Discover best practices for structuring your content in Strapi",
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
      name: "covername",
      url: "/placeholder.svg?height=600&width=1200",
      formats: imageFormats,
    },
    category: [
      {
        id: 1,
        documentId: "absc122joa8sakhq",
        name: "Tutorial",
        slug: "tutorial",
      },
      { id: 3, documentId: "absc122joa8sak11q", name: "CMS", slug: "cms" },
    ],
    author: {
      id: 1,
      name: "Sarah Baker",
      email: "sarahbaker@strapi.io",
      documentId: "kd814y9tcbqkk3nw13kdvydx",
      role: "CMS Specialist",
    },
  },
  {
    id: 3,
    documentId: "qrhen3oooc48ytbkdy9cmy78",
    title: "Building a Headless E-commerce Site",
    slug: "building-a-headless-ecommerce-site",
    description:
      "Step-by-step guide to creating an e-commerce site with Strapi and Next.js",
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
      name: "placeholder",
      url: "/placeholder.svg?height=600&width=1200",
      formats: imageFormats,
    },
    category: [
      { id: 4, documentId: "", name: "E-commerce", slug: "ecommerce" },
      {
        id: 2,
        documentId: "",
        name: "Web Development",
        slug: "web-development",
      },
    ],
    author: {
      id: 1,
      documentId: "",
      name: "Alex Johnson",
      email: "alex_johnson@strapi.io",
      role: "E-commerce Developer",
      avatar: {
        name: "",
        url: "/placeholder.svg?height=100&width=100",
        formats: imageFormats,
      },
    },
  },
] satisfies Post[];

export const mockCategories = [
  { id: 1, documentId: "", name: "Tutorial", slug: "tutorial" },
  { id: 2, documentId: "", name: "Web Development", slug: "web-development" },
  { id: 3, documentId: "", name: "CMS", slug: "cms" },
  { id: 4, documentId: "", name: "E-commerce", slug: "ecommerce" },
] satisfies Category[];
