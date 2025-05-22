import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock } from "lucide-react"


async function getBlogPosts() {
  // In a real implementation, you would fetch from your Strapi API
  // Example: const res = await fetch(`${process.env.STRAPI_API_URL}/api/articles?populate=*`)

  // For demonstration, using placeholder data
  return [
    {
      id: 1,
      attributes: {
        title: "Getting Started with Next.js and Strapi",
        slug: "getting-started-with-nextjs-and-strapi",
        description: "Learn how to build a modern blog with Next.js and Strapi CMS",
        content: "This is a comprehensive guide to building with Next.js and Strapi...",
        publishedAt: "2023-05-15T09:00:00.000Z",
        readingTime: "8 min read",
        cover: {
          data: {
            attributes: {
              url: "/placeholder.svg?height=400&width=600",
            },
          },
        },
        categories: {
          data: [
            { id: 1, attributes: { name: "Tutorial", slug: "tutorial" } },
            { id: 2, attributes: { name: "Web Development", slug: "web-development" } },
          ],
        },
      },
    },
    {
      id: 2,
      attributes: {
        title: "Advanced Strapi Content Modeling",
        slug: "advanced-strapi-content-modeling",
        description: "Discover best practices for structuring your content in Strapi",
        content: "Content modeling is a crucial aspect of any CMS implementation...",
        publishedAt: "2023-06-22T14:30:00.000Z",
        readingTime: "12 min read",
        cover: {
          data: {
            attributes: {
              url: "/placeholder.svg?height=400&width=600",
            },
          },
        },
        categories: {
          data: [
            { id: 1, attributes: { name: "Tutorial", slug: "tutorial" } },
            { id: 3, attributes: { name: "CMS", slug: "cms" } },
          ],
        },
      },
    },
    {
      id: 3,
      attributes: {
        title: "Building a Headless E-commerce Site",
        slug: "building-a-headless-ecommerce-site",
        description: "Step-by-step guide to creating an e-commerce site with Strapi and Next.js",
        content: "Headless e-commerce is revolutionizing how we build online stores...",
        publishedAt: "2023-07-10T10:15:00.000Z",
        readingTime: "15 min read",
        cover: {
          data: {
            attributes: {
              url: "/placeholder.svg?height=400&width=600",
            },
          },
        },
        categories: {
          data: [
            { id: 4, attributes: { name: "E-commerce", slug: "ecommerce" } },
            { id: 2, attributes: { name: "Web Development", slug: "web-development" } },
          ],
        },
      },
    },
  ]
}


export default async function HomePage() {
  const posts = await getBlogPosts();

  return (
    <main className="container mx-auto py-8 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">My Strapi Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A modern blog built with Next.js and Strapi CMS, featuring the latest articles on web development and
          technology.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.attributes.slug}`}
            key={post.id}
            className="transition-transform hover:-translate-y-1"
          >
            <Card className="h-full overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={post.attributes.cover.data.attributes.url || "/placeholder.svg"}
                  alt={post.attributes.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.attributes.categories.data.map((category) => (
                    <Badge key={category.id} variant="secondary">
                      {category.attributes.name}
                    </Badge>
                  ))}
                </div>
                <h2 className="text-xl font-bold line-clamp-2">{post.attributes.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{post.attributes.description}</p>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{new Date(post.attributes.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.attributes.readingTime}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
