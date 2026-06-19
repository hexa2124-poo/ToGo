'use client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  orderNotes: string
  isDrawerOpen: boolean
  // Actions
  addItem: (product: Product, variant?: 'hot' | 'cold', notes?: string) => void
  removeItem: (productId: string, variant?: 'hot' | 'cold') => void
  updateQuantity: (productId: string, quantity: number, variant?: 'hot' | 'cold') => void
  clearCart: () => void
  setOrderNotes: (notes: string) => void
  setDrawerOpen: (open: boolean) => void
  // Computed
  getTotalItems: () => number
  getTotalPrice: () => number
  getItemCount: (productId: string, variant?: 'hot' | 'cold') => number
}

const getItemKey = (productId: string, variant?: 'hot' | 'cold') =>
  variant ? `${productId}-${variant}` : productId

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      orderNotes: '',
      isDrawerOpen: false,

      addItem: (product, variant, notes) => {
        set(state => {
          const existingIndex = state.items.findIndex(
            i => i.product.id === product.id && i.variant === variant
          )
          if (existingIndex >= 0) {
            const updated = [...state.items]
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + 1,
            }
            return { items: updated }
          }
          return {
            items: [...state.items, { product, quantity: 1, variant, notes }],
          }
        })
        set({ isDrawerOpen: true })
      },

      removeItem: (productId, variant) => {
        set(state => ({
          items: state.items.filter(
            i => !(i.product.id === productId && i.variant === variant)
          ),
        }))
      },

      updateQuantity: (productId, quantity, variant) => {
        if (quantity <= 0) {
          get().removeItem(productId, variant)
          return
        }
        set(state => ({
          items: state.items.map(i =>
            i.product.id === productId && i.variant === variant
              ? { ...i, quantity }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [], orderNotes: '' }),

      setOrderNotes: notes => set({ orderNotes: notes }),

      setDrawerOpen: open => set({ isDrawerOpen: open }),

      getTotalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((sum, i) => {
          const price =
            i.variant === 'hot' && i.product.hotPrice
              ? i.product.hotPrice
              : i.variant === 'cold' && i.product.coldPrice
              ? i.product.coldPrice
              : i.product.price
          return sum + price * i.quantity
        }, 0),

      getItemCount: (productId, variant) => {
        const item = get().items.find(
          i => i.product.id === productId && i.variant === variant
        )
        return item?.quantity ?? 0
      },
    }),
    {
      name: 'togocoffee-cart',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : ({} as Storage)
      ),
      partialize: state => ({ items: state.items, orderNotes: state.orderNotes }),
    }
  )
)

export function buildWhatsAppMessage(
  items: CartItem[],
  totalPrice: number,
  orderNotes: string
): string {
  const WHATSAPP_NUMBER = '918347023216'
  const line = (label: string, value: string) => `${label}: ${value}`

  const itemLines = items
    .map(i => {
      const price =
        i.variant === 'hot' && i.product.hotPrice
          ? i.product.hotPrice
          : i.variant === 'cold' && i.product.coldPrice
          ? i.product.coldPrice
          : i.product.price
      const variant = i.variant ? ` (${i.variant})` : ''
      return `  • ${i.product.name}${variant} × ${i.quantity} = ₹${price * i.quantity}`
    })
    .join('\n')

  const msg = [
    '🛒 *New Order — To Go Coffee*',
    '',
    itemLines,
    '',
    `*Total: ₹${totalPrice}*`,
    orderNotes ? `\n📝 Notes: ${orderNotes}` : '',
    '',
    '📍 Phoenix Market, Vesu, Surat',
  ]
    .filter(l => l !== undefined)
    .join('\n')

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}
