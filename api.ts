import type { ApiResponse, Product, Category, Order, Review, SiteSettings } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = typeof window !== 'undefined'
      ? localStorage.getItem('tgc-admin-token')
      : null

    const res = await fetch(`${BASE_URL}/api/proxy?path=${encodeURIComponent(path)}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Request failed' }))
      return { success: false, error: err.error ?? 'Request failed' }
    }

    const data = await res.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Network error. Please try again.' }
  }
}

// ── Products ─────────────────────────────────────────────────────────────────
export const productApi = {
  list: () => request<Product[]>('/products'),
  get:  (id: string) => request<Product>(`/products/${id}`),
  create: (data: Partial<Product>) =>
    request<Product>('/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Product>) =>
    request<Product>(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) =>
    request<void>(`/products/${id}`, { method: 'DELETE' }),
  toggleAvailability: (id: string, isAvailable: boolean) =>
    request<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ isAvailable }),
    }),
}

// ── Categories ───────────────────────────────────────────────────────────────
export const categoryApi = {
  list: () => request<Category[]>('/categories'),
  create: (data: Partial<Category>) =>
    request<Category>('/categories', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Category>) =>
    request<Category>(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) =>
    request<void>(`/categories/${id}`, { method: 'DELETE' }),
}

// ── Orders ───────────────────────────────────────────────────────────────────
export const orderApi = {
  list: (params?: { status?: string; date?: string }) => {
    const q = new URLSearchParams(params as Record<string, string>).toString()
    return request<Order[]>(`/orders${q ? `?${q}` : ''}`)
  },
  get: (id: string) => request<Order>(`/orders/${id}`),
  create: (data: Partial<Order>) =>
    request<Order>('/orders', { method: 'POST', body: JSON.stringify(data) }),
  updateStatus: (id: string, status: Order['status']) =>
    request<Order>(`/orders/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
}

// ── Reviews ──────────────────────────────────────────────────────────────────
export const reviewApi = {
  list: (approvedOnly = true) =>
    request<Review[]>(`/reviews${approvedOnly ? '?approved=true' : ''}`),
  create: (data: Partial<Review>) =>
    request<Review>('/reviews', { method: 'POST', body: JSON.stringify(data) }),
  approve: (id: string) =>
    request<Review>(`/reviews/${id}`, { method: 'PUT', body: JSON.stringify({ isApproved: true }) }),
  delete: (id: string) =>
    request<void>(`/reviews/${id}`, { method: 'DELETE' }),
}

// ── Settings ─────────────────────────────────────────────────────────────────
export const settingsApi = {
  get: () => request<SiteSettings>('/settings'),
  update: (data: Partial<SiteSettings>) =>
    request<SiteSettings>('/settings', { method: 'PUT', body: JSON.stringify(data) }),
}

// ── Auth ─────────────────────────────────────────────────────────────────────
export const authApi = {
  login: (username: string, password: string) =>
    request<{ token: string; user: { id: string; username: string; role: string } }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify({ username, password }) }
    ),
  logout: () => {
    if (typeof window !== 'undefined') localStorage.removeItem('tgc-admin-token')
  },
  isAuthenticated: () => {
    if (typeof window === 'undefined') return false
    return !!localStorage.getItem('tgc-admin-token')
  },
}

// ── Analytics helpers ────────────────────────────────────────────────────────
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && (window as Window & { gtag?: Function }).gtag) {
    ;(window as Window & { gtag?: Function }).gtag!('event', eventName, params)
  }
}
