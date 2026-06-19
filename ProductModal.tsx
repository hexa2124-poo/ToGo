'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingCart, Flame, Snowflake, Tag } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface Props {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [variant, setVariant] = useState<'hot' | 'cold' | undefined>(
    product?.hotPrice && product?.coldPrice ? 'cold' : undefined
  )
  const [notes, setNotes] = useState('')
  const [customization, setCustomization] = useState('')
  const { addItem } = useCartStore()

  if (!product) return null

  const effectivePrice =
    variant === 'hot' && product.hotPrice
      ? product.hotPrice
      : variant === 'cold' && product.coldPrice
      ? product.coldPrice
      : product.price

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(
        product,
        variant,
        [notes, customization].filter(Boolean).join(' | ') || undefined
      )
    }
    onClose()
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed bottom-0 sm:relative z-50 w-full sm:max-w-lg bg-card rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl mx-auto"
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
          >
            {/* Header image area */}
            <div className="relative h-52 bg-gradient-to-br from-coffee/30 to-primary/20 flex items-center justify-center">
              <div className="text-8xl">
                {getEmoji(product.categorySlug)}
              </div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
              >
                <X size={18} />
              </button>
              {product.isBestSeller && (
                <span className="absolute top-4 left-4 bg-primary text-cream text-xs font-bold px-3 py-1 rounded-full">
                  Best Seller
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-heading text-2xl text-foreground">{product.name}</h2>
                  <span className="font-heading text-2xl font-bold text-primary shrink-0">
                    {formatPrice(effectivePrice)}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                  {product.description}
                </p>
                <span className="inline-flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Tag size={10} /> {product.category}
                </span>
              </div>

              {/* Variant selector (hot/cold) */}
              {product.hotPrice && product.coldPrice && (
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Temperature
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { val: 'hot' as const,  icon: <Flame size={14} />,      label: `Hot · ${formatPrice(product.hotPrice)}`,  color: 'text-orange-500' },
                      { val: 'cold' as const, icon: <Snowflake size={14} />, label: `Iced · ${formatPrice(product.coldPrice)}`, color: 'text-blue-400' },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => setVariant(opt.val)}
                        className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                          variant === opt.val
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <span className={opt.color}>{opt.icon}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Customization (flavours) */}
              {product.customizations && product.customizations.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Flavour
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setCustomization('')}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                        !customization ? 'border-primary bg-primary/10 text-primary' : 'border-border'
                      }`}
                    >
                      Default
                    </button>
                    {product.customizations.map(c => (
                      <button
                        key={c}
                        onClick={() => setCustomization(c)}
                        className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                          customization === c ? 'border-primary bg-primary/10 text-primary' : 'border-border'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Special Instructions (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Less sugar, extra ice, no milk…"
                  rows={2}
                  className="w-full bg-muted rounded-xl px-3 py-2.5 text-sm resize-none border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Quantity + Add */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-muted rounded-xl px-3 py-2">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-lg bg-background flex items-center justify-center hover:bg-card transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-medium w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-7 h-7 rounded-lg bg-primary text-cream flex items-center justify-center hover:bg-primary-light transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  disabled={!product.isAvailable}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-cream py-3 rounded-xl font-medium hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-glow-primary"
                >
                  <ShoppingCart size={16} />
                  Add {quantity > 1 ? `${quantity}x` : ''} to Cart · {formatPrice(effectivePrice * quantity)}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function getEmoji(slug: string): string {
  const map: Record<string, string> = {
    'black-coffee': '☕', 'hot-brew': '🔥', 'cold-coffee': '🧊',
    'cold-brew': '⚗️', 'iced-coffee': '🥤', 'coffee-tonic': '🫧',
    'frappe': '🥛', 'matcha': '🍵', 'mocktails': '🍹',
    'non-coffee': '🍫', 'brownies': '🍰', 'add-ons': '➕',
  }
  return map[slug] ?? '☕'
}
