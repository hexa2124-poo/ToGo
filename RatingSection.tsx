'use client'
import { motion } from 'framer-motion'
import { Star, ExternalLink } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/utils'

const REVIEWS = [
  { name: 'Priya Sharma',  text: 'Best cold brew in Vesu! The Vietnamese Cold Brew is unreal. Quick service every time.', rating: 5 },
  { name: 'Aarav Mehta',   text: 'Their matcha cloud series is so unique. Loved the presentation and freshness.', rating: 5 },
  { name: 'Sneha Patel',   text: 'Hidden gem near Aagam Viviana. The Biscoff Frappe is worth every rupee.', rating: 5 },
  { name: 'Rohan Desai',   text: 'Consistent quality, friendly staff, great vibe for a quick evening coffee run.', rating: 4 },
]

export default function RatingSection() {
  return (
    <section className="py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Rating summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 bg-card rounded-2xl p-8 shadow-card text-center space-y-4 sticky top-24"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Google Rating</p>
            <p className="font-heading text-6xl font-bold text-primary">{SITE_CONFIG.rating}</p>
            <div className="flex justify-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={20} fill={i <= Math.round(SITE_CONFIG.rating) ? '#C89B3C' : 'none'} className="text-secondary" />
              ))}
            </div>
            <p className="text-muted-foreground text-sm">Based on {SITE_CONFIG.reviewCount}+ reviews</p>
            <a
              href="https://maps.google.com/?q=Phoenix+Market+Vesu+Surat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline"
            >
              View on Google <ExternalLink size={12} />
            </a>
          </motion.div>

          {/* Reviews grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card rounded-xl p-5 shadow-card space-y-3"
              >
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={13} fill={s <= r.rating ? '#C89B3C' : 'none'} className="text-secondary" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">"{r.text}"</p>
                <p className="text-xs font-medium text-muted-foreground">— {r.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
