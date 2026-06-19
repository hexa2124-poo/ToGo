export type Category = {
  id: string
  name: string
  slug: string
  icon: string
  description?: string
  sortOrder: number
  isActive: boolean
  createdAt?: string
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  hotPrice?: number
  coldPrice?: number
  category: string
  categorySlug: string
  imageUrl?: string
  isAvailable: boolean
  isFeatured: boolean
  isBestSeller: boolean
  isNew?: boolean
  tags?: string[]
  customizations?: string[]
  sortOrder?: number
  createdAt?: string
  updatedAt?: string
}

export type CartItem = {
  product: Product
  quantity: number
  variant?: 'hot' | 'cold'
  notes?: string
}

export type Cart = {
  items: CartItem[]
  orderNotes: string
}

export type Order = {
  id: string
  items: CartItem[]
  customerName: string
  customerPhone: string
  customerAddress?: string
  orderType: 'pickup' | 'delivery'
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  totalAmount: number
  orderNotes?: string
  whatsappSent: boolean
  createdAt: string
  updatedAt: string
}

export type Review = {
  id: string
  customerName: string
  rating: number
  comment: string
  productId?: string
  isApproved: boolean
  createdAt: string
}

export type Banner = {
  id: string
  title: string
  subtitle?: string
  imageUrl: string
  ctaText?: string
  ctaLink?: string
  isActive: boolean
  sortOrder: number
}

export type SiteSettings = {
  businessName: string
  tagline: string
  phone: string
  whatsapp: string
  email?: string
  address: string
  googleMapsUrl: string
  instagramUrl: string
  openTime: string
  closeTime: string
  isOpen: boolean
  googleRating: number
  reviewCount: number
  gaId?: string
  primaryColor: string
  secondaryColor: string
}

export type AdminUser = {
  id: string
  username: string
  email: string
  role: 'admin' | 'staff'
  isActive: boolean
  createdAt: string
}

export type AuthPayload = {
  userId: string
  username: string
  role: string
  exp: number
}

export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export type OrderStatus = Order['status']

export type SortOption = 'name' | 'price-asc' | 'price-desc' | 'popular'

export type FilterState = {
  category: string
  search: string
  sort: SortOption
  availableOnly: boolean
}
