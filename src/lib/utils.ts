import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = "EUR") {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
  }).format(price)
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `LMG-${timestamp}-${randomStr}`.toUpperCase();
}

export function getStockStatus(stockLevel: number): 'available' | 'low' | 'out' {
  if (stockLevel === 0) return 'out';
  if (stockLevel <= 5) return 'low';
  return 'available';
}