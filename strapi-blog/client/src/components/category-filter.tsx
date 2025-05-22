"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"

interface Category {
  id: number
  attributes: {
    name: string
    slug: string
  }
}

interface CategoryFilterProps {
  categories: Category[]
  onFilterChange: (selectedCategories: string[]) => void
}

export function CategoryFilter({ categories, onFilterChange }: CategoryFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (slug: string) => {
    const newSelection = selectedCategories.includes(slug)
      ? selectedCategories.filter((cat) => cat !== slug)
      : [...selectedCategories, slug]

    setSelectedCategories(newSelection)
    onFilterChange(newSelection)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Badge
          key={category.id}
          variant={selectedCategories.includes(category.attributes.slug) ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => toggleCategory(category.attributes.slug)}
        >
          {category.attributes.name}
        </Badge>
      ))}
    </div>
  )
}
