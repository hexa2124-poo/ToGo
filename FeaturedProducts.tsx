'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ProductCard from '@/components/menu/ProductCard'
import ProductModal from '@/components/menu/ProductModal'
import { FEATURED_PRODUCTS, BESTSELLER_PRODUCTS } from '@/lib/menu-data'
import type { Product } from '@/types'

export default function FeaturedProducts() {
  const [quickView, setQuickView] = useState<Product | null>(null)

  return (
    <>
      {/* Best Sellers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Customer Favorites"
            title="Best Sellers"
            subtitle="The drinks everyone keeps coming back for"
            href="/menu"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
            {BESTSELLER_PRODUCTS.slice(0, 8).map((p, i) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickView} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Handpicked"
            title="Featured Drinks"
            subtitle="Our signature selections, crafted with premium ingredients"
            href="/menu"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
            {FEATURED_PRODUCTS.slice(0, 8).map((p, i) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickView} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ProductModal product={quickView} onClose={() => setQuickView(null)} />
    </>
  )
}

function SectionHeader({
  eyebrow, title, subtitle, href,
}: { eyebrow: string; title: string; subtitle: string; href: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-end justify-between flex-wrap gap-4"
    >
      <div>
        <p className="text-secondary text-xs uppercase tracking-[0.2em] font-medium mb-2">{eyebrow}</p>
        <h2 className="font-heading text-4xl font-bold">{title}</h2>
        <p className="text-muted-foreground mt-2">{subtitle}</p>
      </div>
      <Link
        href={href}
        className="flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all text-sm shrink-0"
      >
        View Full Menu <ChevronRight size={16} />
      </Link>
    </motion.div>
  )
}
