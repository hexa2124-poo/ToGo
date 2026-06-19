'use client'
import { useState, useMemo, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import FloatingCartButton from '@/components/cart/FloatingCartButton'
import ProductCard from '@/components/menu/ProductCard'
import ProductModal from '@/components/menu/ProductModal'
import { CATEGORIES, PRODUCTS } from '@/lib/menu-data'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

function MenuContent() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [quickView, setQuickView] = useState<Product | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [availableOnly, setAvailableOnly] = useState(false)

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (activeCategory !== 'all' && p.categorySlug !== activeCategory) return false
      if (availableOnly && !p.isAvailable) return false
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) &&
          !p.description.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [activeCategory, search, availableOnly])

  const groupedByCategory = useMemo(() => {
    if (activeCategory !== 'all') return { [activeCategory]: filtered }
    return CATEGORIES.reduce((acc, cat) => {
      const items = filtered.filter(p => p.categorySlug === cat.slug)
      if (items.length) acc[cat.slug] = items
      return acc
    }, {} as Record<string, Product[]>)
  }, [filtered, activeCategory])

  return (
    <>
      <Header />
      <main className="pt-28 pb-24 min-h-screen">
        {/* Page header */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-secondary text-xs uppercase tracking-[0.2em] font-medium mb-2">
              {PRODUCTS.length}+ Beverages
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold">Our Menu</h1>
            <p className="text-muted-foreground mt-2">
              Handcrafted coffee, cold brews, matcha & mocktails — made fresh to order.
            </p>
          </motion.div>

          {/* Search + filter */}
          <div className="flex gap-3 mt-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search drinks, e.g. matcha, cold brew…"
                className="w-full bg-card border border-border rounded-xl pl-10 pr-10 py-3 text-sm focus:border-primary focus:outline-none transition-colors shadow-card"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(s => !s)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-colors shrink-0',
                showFilters ? 'border-primary text-primary bg-primary/5' : 'border-border'
              )}
            >
              <SlidersHorizontal size={15} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex gap-3 mt-3 overflow-hidden"
            >
              <label className="flex items-center gap-2 text-sm bg-card border border-border rounded-lg px-3 py-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={e => setAvailableOnly(e.target.checked)}
                  className="accent-primary"
                />
                Available only
              </label>
            </motion.div>
          )}
        </div>

        {/* Sticky category nav */}
        <div className="category-nav-sticky border-b border-border py-3 mb-10">
          <div className="max-w-7xl mx-auto px-4 flex gap-2 overflow-x-auto no-scrollbar">
            <CategoryPill
              label="All"
              icon="🍽️"
              active={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
            />
            {CATEGORIES.map(cat => (
              <CategoryPill
                key={cat.slug}
                label={cat.name}
                icon={cat.icon}
                active={activeCategory === cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
              />
            ))}
          </div>
        </div>

        {/* Products grid grouped by category */}
        <div className="max-w-7xl mx-auto px-4 space-y-14">
          {Object.keys(groupedByCategory).length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🔍</div>
              <p className="font-heading text-xl">No drinks found</p>
              <p className="text-muted-foreground text-sm mt-1">Try a different search or category</p>
            </div>
          ) : (
            Object.entries(groupedByCategory).map(([slug, products]) => {
              const cat = CATEGORIES.find(c => c.slug === slug)
              return (
                <section key={slug} id={slug}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{cat?.icon}</span>
                    <div>
                      <h2 className="font-heading text-2xl font-bold">{cat?.name}</h2>
                      {cat?.description && (
                        <p className="text-muted-foreground text-xs">{cat.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((p, i) => (
                      <ProductCard key={p.id} product={p} onQuickView={setQuickView} index={i} />
                    ))}
                  </div>
                </section>
              )
            })
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <FloatingCartButton />
      <ProductModal product={quickView} onClose={() => setQuickView(null)} />
    </>
  )
}

function CategoryPill({
  label, icon, active, onClick,
}: { label: string; icon: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border shrink-0',
        active
          ? 'category-active border-transparent shadow-glow-primary'
          : 'border-border text-foreground/70 hover:border-primary/50'
      )}
    >
      <span>{icon}</span>
      {label}
    </button>
  )
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <MenuContent />
    </Suspense>
  )
}
