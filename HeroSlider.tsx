'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Star, MapPin, Clock } from 'lucide-react'

const SLIDES = [
  {
    id: 1,
    headline: 'Fresh Coffee.',
    subheadline: 'Fast Service.',
    body: 'Premium specialty coffee at Phoenix Market, Vesu. Every cup tells a story.',
    cta: 'Explore Menu',
    ctaLink: '/menu',
    accent: 'Cold Brew & Matcha',
    bg: 'from-[#111827] via-[#1a0a0a] to-[#111827]',
  },
  {
    id: 2,
    headline: 'Cold Brew.',
    subheadline: '12-Hour Steeped.',
    body: 'Slow steeped cold brew in 14 flavors. Smooth, bold, zero bitterness.',
    cta: 'Order Now',
    ctaLink: '/menu?category=cold-brew',
    accent: 'Starting ₹140',
    bg: 'from-[#0a1020] via-[#111827] to-[#0a1020]',
  },
  {
    id: 3,
    headline: 'Matcha Clouds.',
    subheadline: 'New Arrivals.',
    body: 'Blueberry, Strawberry & Mango Matcha Clouds. Limited edition seasonal specials.',
    cta: 'Try Now',
    ctaLink: '/menu?category=matcha',
    accent: '★ New This Season',
    bg: 'from-[#0a1a14] via-[#111827] to-[#0a1a14]',
  },
]

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = SLIDES[current]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`}
        />
      </AnimatePresence>

      {/* Coffee bean pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #C89B3C 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 grid md:grid-cols-2 gap-16 items-center w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            variants={stagger}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            className="space-y-6"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block px-4 py-1.5 bg-secondary/20 border border-secondary/40 rounded-full text-secondary text-xs tracking-widest uppercase"
            >
              {slide.accent}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-6xl sm:text-7xl lg:text-8xl font-bold text-cream leading-[0.9] hero-text-shadow"
            >
              {slide.headline}
              <br />
              <span className="text-secondary">{slide.subheadline}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-cream/70 text-lg leading-relaxed max-w-md"
            >
              {slide.body}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link
                href={slide.ctaLink}
                className="flex items-center gap-2 bg-primary hover:bg-primary-light text-cream px-6 py-3.5 rounded-xl font-medium transition-all hover:shadow-glow-primary"
              >
                {slide.cta}
                <ChevronRight size={16} />
              </Link>
              <a
                href="https://wa.me/918347023216"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] px-6 py-3.5 rounded-xl font-medium transition-all hover:bg-[#25D366]/30"
              >
                WhatsApp Order
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex gap-6 pt-2">
              <div className="flex items-center gap-1.5 text-cream/60 text-sm">
                <Star size={14} fill="#C89B3C" className="text-secondary" />
                <span>4.7 · 58+ Reviews</span>
              </div>
              <div className="flex items-center gap-1.5 text-cream/60 text-sm">
                <Clock size={14} className="text-secondary" />
                <span>5 PM – 12 AM</span>
              </div>
              <div className="flex items-center gap-1.5 text-cream/60 text-sm">
                <MapPin size={14} className="text-secondary" />
                <span>Vesu, Surat</span>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Visual card side */}
        <div className="hidden md:flex justify-center">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="glass rounded-3xl p-8 w-72 text-center space-y-4 border border-white/10"
          >
            <div className="text-7xl">☕</div>
            <h3 className="font-heading text-2xl text-cream">To Go Coffee</h3>
            <div className="flex justify-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={16} fill={i <= 4 ? '#C89B3C' : 'none'} className="text-secondary" />
              ))}
            </div>
            <p className="text-cream/60 text-xs tracking-widest uppercase">70+ Menu Items</p>
            <div className="grid grid-cols-3 gap-2 text-xs text-cream/50">
              <div className="glass rounded-lg py-2">Espresso</div>
              <div className="glass rounded-lg py-2">Matcha</div>
              <div className="glass rounded-lg py-2">Cold Brew</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-8 h-2 bg-secondary'
                : 'w-2 h-2 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 right-8 text-cream/30 text-xs tracking-widest uppercase hidden md:block"
        style={{ writingMode: 'vertical-rl' }}
      >
        Scroll
      </motion.div>
    </section>
  )
}
