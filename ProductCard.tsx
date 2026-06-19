'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Eye, Flame, Snowflake, Sparkles } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice, cn } from '@/lib/utils'
import type { Product } from '@/types'

interface Props {
  product: Product
  onQuickView: (product: Product) => void
  index?: number
}

export default function ProductCard({ product, onQuickView, index = 0 }: Props) {
  const [adding, setAdding] = useState(false)
  const { addItem, getItemCount } = useCartStore()
  const count = getItemCount(product.id)

  const handleAdd = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!product.isAvailable) return
    setAdding(true)
    addItem(product)
    setTimeout(() => setAdding(false), 700)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="product-card group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover border border-border relative"
    >
      {/* Image / Icon area */}
      <div
        className="relative h-44 bg-gradient-to-br from-coffee/20 to-primary/10 flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={() => onQuickView(product)}
      >
        {/* Placeholder visual */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-6xl select-none"
        >
          {getCategoryEmoji(product.categorySlug)}
        </motion.div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="flex items-center gap-1 bg-secondary text-dark text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              <Sparkles size={9} /> New
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="bg-primary text-cream text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              Best Seller
            </span>
          )}
          {!product.isAvailable && (
            <span className="bg-muted text-muted-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Unavailable
            </span>
          )}
        </div>

        {/* Quick view on hover */}
        <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => onQuickView(product)}
            className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white border border-white/30 px-3 py-1.5 rounded-lg text-xs font-medium"
          >
            <Eye size={12} /> Quick View
          </button>
        </div>

        {/* Cart count badge */}
        {count > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute bottom-3 right-3 bg-primary text-cream text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
          >
            {count}
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-medium text-foreground text-sm leading-snug line-clamp-1">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-xs mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Variants indicator */}
        {(product.hotPrice || product.coldPrice) && (
          <div className="flex gap-1.5">
            {product.hotPrice && (
              <span className="flex items-center gap-1 text-[10px] text-orange-500 bg-orange-500/10 px-1.5 py-0.5 rounded-md">
                <Flame size={9} /> {formatPrice(product.hotPrice)}
              </span>
            )}
            {product.coldPrice && (
              <span className="flex items-center gap-1 text-[10px] text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded-md">
                <Snowflake size={9} /> {formatPrice(product.coldPrice)}
              </span>
            )}
          </div>
        )}

        {/* Price + Add */}
        <div className="flex items-center justify-between pt-1">
          <span className="font-heading text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>

          <motion.button
            onClick={handleAdd}
            disabled={!product.isAvailable}
            whileTap={{ scale: 0.9 }}
            className={cn(
              'flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-medium transition-all',
              product.isAvailable
                ? adding
                  ? 'bg-secondary text-dark scale-95'
                  : 'bg-primary text-cream hover:bg-primary-light hover:shadow-glow-primary'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
          >
            {adding ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xs"
              >
                ✓ Added
              </motion.span>
            ) : (
              <>
                <Plus size={14} />
                <span className="text-xs">Add</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}

function getCategoryEmoji(slug: string): string {
  const map: Record<string, string> = {
    'black-coffee':  '☕',
    'hot-brew':      '🔥',
    'cold-coffee':   '🧊',
    'cold-brew':     '⚗️',
    'iced-coffee':   '🥤',
    'coffee-tonic':  '🫧',
    'frappe':        '🥛',
    'matcha':        '🍵',
    'mocktails':     '🍹',
    'non-coffee':    '🍫',
    'brownies':      '🍰',
    'add-ons':       '➕',
  }
  return map[slug] ?? '☕'
}
