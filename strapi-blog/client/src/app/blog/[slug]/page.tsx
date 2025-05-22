import Image from "next/image"
import Link from "next/link"
import { remark } from 'remark';
import html from 'remark-html';
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, ArrowLeft } from "lucide-react"
import { getPostBySlug } from "@/server/api"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import type { MediaBlock, QuoteBlock, RichTextBlock, SliderBlock } from "@/types/strapi"
import { Suspense } from "react";
import { env } from "@/env";
import { safeTransformAssetUrl } from "@/lib/utils";

async function getBlogPost(slug: string) {
  const response = await getPostBySlug(slug);
  if (!response) {
    notFound();
  }

  return response;
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
            {post.category.map((category) => (
              <Badge key={category.id} variant="secondary">
                {category.name}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          <div className="aspect-[2/1] relative rounded-lg overflow-hidden mb-8">
            <Image
              src={safeTransformAssetUrl(post.cover?.url)}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {post.author && (
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg mb-8">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src={safeTransformAssetUrl(post.author?.avatar?.url)}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-muted-foreground">{post.author.role}</div>
              </div>
            </div>
          )}
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          {/* In a real implementation, you would use a markdown renderer like react-markdown */}
          {/* <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br>") }} /> */}
          {post.blocks.map((block, index) => {
            switch (block.__component) {
              case "shared.media":
                block = block as MediaBlock;
                return <Markdown key={index} content={""} />
              case "shared.quote":
                block = block as QuoteBlock;
                return <Markdown key={index} content={""} />
              case "shared.rich-text":
                block = block as RichTextBlock;
                return <Markdown key={index} content={block.body} />
              case "shared.slider":
                block = block as SliderBlock;
                return <Markdown key={index} content={""} />
            }
          })}
        </div>
      </article>
    </div>
  )
}

interface MarkdownProps {
  content: string
}

const Markdown = async ({ content }: MarkdownProps) => {
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();;
  return <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
}
