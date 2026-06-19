'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react'
import { useCartStore, buildWhatsAppMessage } from '@/lib/cart-store'
import { formatPrice } from '@/lib/utils'
import { trackEvent } from '@/lib/api'

export default function CartDrawer() {
  const {
    items, orderNotes, isDrawerOpen,
    setDrawerOpen, updateQuantity, removeItem,
    clearCart, setOrderNotes,
    getTotalItems, getTotalPrice,
  } = useCartStore()

  const total = getTotalPrice()
  const count = getTotalItems()

  const handleWhatsAppOrder = () => {
    const url = buildWhatsAppMessage(items, total, orderNotes)
    trackEvent('whatsapp_order', { value: total, items: count })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="cart-overlay"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="cart-drawer"
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" />
                <h2 className="font-heading text-xl">Your Order</h2>
                {count > 0 && (
                  <span className="bg-primary text-cream text-xs font-bold px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {count > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center gap-4">
                  <div className="text-6xl">☕</div>
                  <div>
                    <p className="font-heading text-lg">Your cart is empty</p>
                    <p className="text-muted-foreground text-sm mt-1">Add your favorite drinks to get started</p>
                  </div>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    Browse menu →
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map(item => {
                    const price =
                      item.variant === 'hot' && item.product.hotPrice
                        ? item.product.hotPrice
                        : item.variant === 'cold' && item.product.coldPrice
                        ? item.product.coldPrice
                        : item.product.price

                    return (
                      <motion.div
                        key={`${item.product.id}-${item.variant}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-start gap-3 bg-muted rounded-xl p-3"
                      >
                        {/* Icon */}
                        <div className="text-2xl shrink-0 w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                          {getCategoryEmoji(item.product.categorySlug)}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm leading-tight line-clamp-1">
                            {item.product.name}
                          </p>
                          {item.variant && (
                            <p className="text-xs text-muted-foreground capitalize mt-0.5">
                              {item.variant}
                            </p>
                          )}
                          {item.notes && (
                            <p className="text-xs text-muted-foreground mt-0.5 italic">
                              "{item.notes}"
                            </p>
                          )}
                          <p className="text-primary font-bold text-sm mt-1">
                            {formatPrice(price * item.quantity)}
                          </p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant)}
                            className="w-7 h-7 rounded-lg bg-background flex items-center justify-center hover:bg-card transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-5 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant)}
                            className="w-7 h-7 rounded-lg bg-primary text-cream flex items-center justify-center hover:bg-primary-light transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id, item.variant)}
                            className="w-7 h-7 rounded-lg bg-background flex items-center justify-center hover:text-destructive ml-1 transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-5 space-y-4">
                {/* Order notes */}
                <textarea
                  value={orderNotes}
                  onChange={e => setOrderNotes(e.target.value)}
                  placeholder="Order notes (e.g. less sugar, extra ice)…"
                  rows={2}
                  className="w-full bg-muted rounded-xl px-3 py-2.5 text-sm resize-none border border-border focus:border-primary focus:outline-none transition-colors"
                />

                {/* Summary */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{count} item{count > 1 ? 's' : ''}</span>
                  <span className="font-heading text-xl font-bold text-primary">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* WhatsApp CTA */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl font-semibold text-base hover:bg-[#1DAE53] transition-colors shadow-lg"
                >
                  <MessageCircle size={20} />
                  Order on WhatsApp
                </motion.button>

                <p className="text-center text-xs text-muted-foreground">
                  Opens WhatsApp with your order pre-filled
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function getCategoryEmoji(slug: string): string {
  const map: Record<string, string> = {
    'black-coffee': '☕', 'hot-brew': '🔥', 'cold-coffee': '🧊',
    'cold-brew': '⚗️', 'iced-coffee': '🥤', 'coffee-tonic': '🫧',
    'frappe': '🥛', 'matcha': '🍵', 'mocktails': '🍹',
    'non-coffee': '🍫', 'brownies': '🍰', 'add-ons': '➕',
  }
  return map[slug] ?? '☕'
}
