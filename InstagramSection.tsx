'use client'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { trackEvent } from '@/lib/api'

const EMOJIS = ['☕', '🧊', '🍵', '🥤', '🍹', '🍰']

export default function InstagramSection() {
  return (
    <section className="py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-secondary text-xs uppercase tracking-[0.2em] font-medium mb-2">Follow Along</p>
          <h2 className="font-heading text-4xl font-bold flex items-center justify-center gap-3">
            <Instagram size={32} className="text-primary" />
            @togocoffee.in
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {EMOJIS.map((emoji, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/togocoffee.in"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('instagram_click')}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-xl bg-gradient-to-br from-coffee/20 to-primary/20 flex items-center justify-center text-4xl relative overflow-hidden group"
            >
              <span>{emoji}</span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <Instagram size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/togocoffee.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            View More on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
