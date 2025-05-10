'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const categories = ['all','sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'];

const CategoryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value !== "all") {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleCategoryChange} value={currentCategory || ''}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>All Categories</SelectLabel>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;