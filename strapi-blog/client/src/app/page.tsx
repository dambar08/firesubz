import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock } from "lucide-react"
import { getAllPosts } from "@/server/api"
import { env } from "@/env"
import { safeTransformAssetUrl } from "@/lib/utils"

async function getBlogPosts() {
  const response = await getAllPosts();
  return response.data;
}

export default async function HomePage() {
  const posts = await getBlogPosts();

  return (
    <main className="container mx-auto py-8 px-4">
      <header className="mb-12 text-center">
        <h1 className="fade-out text-4xl font-bold mb-4">My Strapi Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A modern blog built with Next.js and Strapi CMS, featuring the latest articles on web development and
          technology.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.id}
            className="transition-transform hover:-translate-y-1"
          >
            <Card className="h-full overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={safeTransformAssetUrl(post?.cover?.url)}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.category.map((category) => (
                    <Badge key={category.id} variant="secondary">
                      {category.name}
                    </Badge>
                  ))}
                </div>
                <h2 className="text-xl font-bold line-clamp-2">{post.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{post.description}</p>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime}</span>
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
