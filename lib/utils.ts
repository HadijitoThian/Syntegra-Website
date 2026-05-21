import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PRODUCT_LINKS = {
  social: "https://syntegra-landing-builder-production.up.railway.app/",
  pos: "https://repsyntegrapos-production.up.railway.app/",
  synthia: "https://www.syntia.syntegra.co.id/",
} as const;
