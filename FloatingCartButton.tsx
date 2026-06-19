'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/utils'

export default function FloatingCartButton() {
  const { getTotalItems, getTotalPrice, setDrawerOpen, isDrawerOpen } = useCartStore()
  const count = getTotalItems()
  const total = getTotalPrice()

  return (
    <AnimatePresence>
      {count > 0 && !isDrawerOpen && (
        <motion.button
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          onClick={() => setDrawerOpen(true)}
          className="floating-cart flex items-center gap-3 bg-primary text-cream pl-4 pr-5 py-3.5 rounded-2xl shadow-glow-primary md:bottom-6"
        >
          <div className="relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-2 -right-2 bg-secondary text-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {count > 9 ? '9+' : count}
            </span>
          </div>
          <span className="font-medium text-sm">{formatPrice(total)}</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
