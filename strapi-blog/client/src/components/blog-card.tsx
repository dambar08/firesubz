import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock } from "lucide-react"
import type { Post } from "@/types/strapi"

interface BlogCardProps {
  post: Post
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.attributes.slug}`} className="transition-transform hover:-translate-y-1">
      <Card className="h-full overflow-hidden">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={post.attributes.cover.data?.attributes.url || "/placeholder.svg?height=400&width=600"}
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
  )
}
