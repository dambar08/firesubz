import { Suspense } from "react"
import { SearchBar } from "@/components/search-bar"
import { Pagination } from "@/components/pagination"
import { CategoryFilter } from "@/components/category-filter"
import { BlogCard } from "@/components/blog-card"
import { getAllPosts, getAllCategories } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; category?: string }
}) {
  const page = Number(searchParams.page) || 1
  const search = searchParams.search || ""
  const category = searchParams.category || ""

  // In a real implementation, these would fetch from your Strapi API with proper pagination
  const { data: posts, meta } = await getAllPosts()
  const { data: categories } = await getAllCategories()

  // Mock pagination data
  const totalPages = 3

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <SearchBar onSearch={(query) => console.log("Search:", query)} />

        <div className="md:text-right text-sm text-muted-foreground">Showing {posts.length} articles</div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
        <CategoryFilter categories={categories} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<PostsSkeleton />}>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </Suspense>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => console.log("Page changed:", newPage)}
      />
    </div>
  )
}

function PostsSkeleton() {
  return (
    <>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        ))}
    </>
  )
}
