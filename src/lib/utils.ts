import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")                         // remove accents
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "")                       // remove ampersand
    .replace(/[^a-z0-9\s-ㄱ-ㅎㅏ-ㅣ가-힣]/g, "") // allow ascii letters/numbers/hyphen/space/korean
    .trim()
    .replace(/\s+/g, "-")                    // spaces -> hyphen
    .replace(/-+/g, "-");
}