// Type definitions for Strapi API responses

export interface StrapiImage {
  id?: number;
  documentId?: string;
  name: string;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats: ImageFormats
}
export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface ImageFormats {
  thumbnail?: ImageFormat;
  medium?: ImageFormat;
  small?: ImageFormat;
  large?: ImageFormat;
}
export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface Author {
    id: number;
    documentId: string;
    name: string;
    email: string;
    role?: string;
    bio?: string;
    avatar?: StrapiImage;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
}

export interface Post {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  blocks: Blocks;
  readingTime: string;
  cover: StrapiImage | null;
  category: Category[];
  author: Author;
  createdAt?: string;
  updatedAt?: string;
  publishedAt: string;
}

// Base interface for common block properties
interface BaseBlock {
  __component: string;
  id: number;
}

// Rich Text Block: expects a markdown string in "body"
export interface RichTextBlock extends BaseBlock {
  __component: "shared.rich-text";
  body: string;
}

// Quote Block: includes a title and a body
export interface QuoteBlock extends BaseBlock {
  __component: "shared.quote";
  title: string;
  body: string;
}

// Media Block: currently only has id and __component, but can be extended later
export interface MediaBlock extends BaseBlock {
  __component: "shared.media";
  // additional media-specific fields can be added here
}

// Slider Block: currently only has id and __component, but can be extended later
export interface SliderBlock extends BaseBlock {
  __component: "shared.slider";
  // additional slider-specific fields can be added here
}

// Union type of all possible blocks
export type Block = RichTextBlock | QuoteBlock | MediaBlock | SliderBlock;

// If your JSON returns an array of blocks, you might define:
export type Blocks = Block[];


export interface ApiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
