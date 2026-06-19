'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, Sun, Moon, Phone, Instagram } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/',      label: 'Home' },
  { href: '/menu',  label: 'Menu' },
]

export default function Header() {
  const pathname  = usePathname()
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [mounted, setMounted]       = useState(false)
  const { getTotalItems, setDrawerOpen } = useCartStore()
  const totalItems = getTotalItems()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = pathname === '/'

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled || !isHome
            ? 'glass-cream shadow-glass py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-heading text-xl font-bold text-primary group-hover:text-primary-light transition-colors">
              To Go Coffee
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-secondary font-body">
              Fresh · Fast · Anytime
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-foreground/80'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Dark Mode */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {/* Call */}
            <a
              href="tel:+918347023216"
              className="hidden md:flex p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Call us"
            >
              <Phone size={18} />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/togocoffee.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>

            {/* Cart */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative flex items-center gap-2 bg-primary text-cream px-3 py-2 rounded-xl text-sm font-medium hover:bg-primary-light transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-secondary text-dark text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </motion.span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-72 z-40 glass-cream p-8 flex flex-col gap-6 md:hidden"
            >
              <button onClick={() => setMenuOpen(false)} className="self-end p-1">
                <X size={22} />
              </button>
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'font-heading text-2xl transition-colors',
                    pathname === link.href ? 'text-primary' : 'hover:text-primary'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-border" />
              <a href="tel:+918347023216" className="flex items-center gap-2 text-sm">
                <Phone size={16} /> +91 83470 23216
              </a>
              <a
                href="https://www.instagram.com/togocoffee.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm"
              >
                <Instagram size={16} /> @togocoffee.in
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
