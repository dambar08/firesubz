import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, ArrowLeft } from "lucide-react"

async function getBlogPost(slug: string) {
  // In a real implementation, you would fetch from your Strapi API
  // Example: const res = await fetch(`${process.env.STRAPI_API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`)

  // For demonstration, using placeholder data
  const posts = [
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
        content: "Detailed content about building e-commerce with Strapi...",
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

  const post = posts.find((post) => post.attributes.slug === slug)

  if (!post) {
    notFound()
  }

  return post
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to all posts</span>
      </Link>

      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.attributes.categories.data.map((category) => (
              <Badge key={category.id} variant="secondary">
                {category.attributes.name}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl font-bold mb-4">{post.attributes.title}</h1>

          <div className="flex items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>{new Date(post.attributes.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.attributes.readingTime}</span>
            </div>
          </div>

          <div className="aspect-[2/1] relative rounded-lg overflow-hidden mb-8">
            <Image
              src={post.attributes.cover.data.attributes.url || "/placeholder.svg"}
              alt={post.attributes.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {post.attributes.author && (
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg mb-8">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src={post.attributes.author.data.attributes.avatar.data.attributes.url || "/placeholder.svg"}
                  alt={post.attributes.author.data.attributes.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{post.attributes.author.data.attributes.name}</div>
                <div className="text-sm text-muted-foreground">{post.attributes.author.data.attributes.role}</div>
              </div>
            </div>
          )}
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          {/* In a real implementation, you would use a markdown renderer like react-markdown */}
          <div dangerouslySetInnerHTML={{ __html: post.attributes.content.replace(/\n/g, "<br>") }} />
        </div>
      </article>
    </div>
  )
}
