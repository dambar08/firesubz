import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock } from "lucide-react"
import type { Post } from "@/types/strapi"
import { env } from "@/env"

interface BlogCardProps {
  post: Post
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="transition-transform hover:-translate-y-1">
      <Card className="h-full overflow-hidden">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={post.cover?.url ? `${env.STRAPI_ASSET_HOST}${post.cover?.url}` : "/placeholder.svg?height=400&width=600"}
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
  )
}
