import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const truncateAddress = (address: string) => {
  if (!address) return ""
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
