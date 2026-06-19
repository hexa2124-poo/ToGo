import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `TGC-${timestamp}-${random}`
}

export function isBusinessOpen(): boolean {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const totalMinutes = hours * 60 + minutes
  // 5 PM = 17:00 = 1020 min, 12 AM = 0:00 = 0 min (next day)
  return totalMinutes >= 17 * 60 || totalMinutes < 0
}

export function getBusinessStatus(): { isOpen: boolean; message: string } {
  const isOpen = isBusinessOpen()
  return {
    isOpen,
    message: isOpen
      ? 'Open Now · Closes at 12:00 AM'
      : 'Closed · Opens at 5:00 PM',
  }
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

export const SITE_CONFIG = {
  name: 'To Go Coffee',
  tagline: 'Fresh Coffee. Fast Service. Anytime.',
  phone: '+91 83470 23216',
  whatsapp: '918347023216',
  instagram: 'https://www.instagram.com/togocoffee.in',
  address: 'Phoenix Market, Opp. Aagam Viviana, Near Florance Apartment, Vesu, Surat, Gujarat - 395007',
  googleMaps: 'https://maps.google.com/?q=Phoenix+Market+Vesu+Surat',
  openTime: '5:00 PM',
  closeTime: '12:00 AM',
  rating: 4.7,
  reviewCount: 58,
}
