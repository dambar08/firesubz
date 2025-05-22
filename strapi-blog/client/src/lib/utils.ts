import { env } from "@/env";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeTransformAssetUrl(
  url: string | undefined | null,
  orElse: string = "/placeholder.svg",
) {
  return url ? `${env.NEXT_PUBLIC_STRAPI_ASSET_HOST}${url}` : orElse;
}
