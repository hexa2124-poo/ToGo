import Link from 'next/link'
import { MapPin, Phone, Clock, Instagram, Star } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-surface border-t border-dark-border text-cream/70">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <div>
            <h3 className="font-heading text-2xl font-bold text-cream">To Go Coffee</h3>
            <p className="text-secondary text-xs tracking-widest uppercase mt-1">
              Fresh · Fast · Anytime
            </p>
          </div>
          <p className="text-sm leading-relaxed text-cream/60">
            Premium mobile coffee cart bringing exceptional specialty beverages to Surat.
            Every cup crafted with care.
          </p>
          <div className="flex items-center gap-1.5 text-secondary">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < 4 || true ? 'currentColor' : 'none'}
                className={i < 4 ? 'text-secondary' : 'text-secondary/40'}
              />
            ))}
            <span className="text-xs text-cream/60 ml-1">4.7 · 58+ reviews</span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <h4 className="font-heading text-lg text-cream">Find Us</h4>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <MapPin size={16} className="text-secondary shrink-0 mt-0.5" />
              <span className="text-cream/60 leading-relaxed">
                Phoenix Market, Opp. Aagam Viviana,<br />
                Near Florance Apartment, Vesu,<br />
                Surat, Gujarat — 395007
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <Phone size={16} className="text-secondary shrink-0" />
              <a href="tel:+918347023216" className="hover:text-cream transition-colors">
                +91 83470 23216
              </a>
            </div>
            <div className="flex gap-3 items-center">
              <Clock size={16} className="text-secondary shrink-0" />
              <span className="text-cream/60">5:00 PM — 12:00 AM · Daily</span>
            </div>
            <div className="flex gap-3 items-center">
              <Instagram size={16} className="text-secondary shrink-0" />
              <a
                href="https://www.instagram.com/togocoffee.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cream transition-colors"
              >
                @togocoffee.in
              </a>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <h4 className="font-heading text-lg text-cream">Quick Actions</h4>
          <div className="flex flex-col gap-3">
            <a
              href="https://wa.me/918347023216"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-[#1DAE53] transition-colors"
            >
              Order on WhatsApp
            </a>
            <a
              href="https://maps.google.com/?q=Phoenix+Market+Vesu+Surat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-dark-border text-cream px-4 py-3 rounded-xl text-sm hover:bg-dark-border/70 transition-colors"
            >
              Get Directions
            </a>
            <Link
              href="/menu"
              className="flex items-center justify-center gap-2 border border-secondary/50 text-secondary px-4 py-3 rounded-xl text-sm hover:border-secondary transition-colors"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-dark-border py-6 text-center text-xs text-cream/30 max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} To Go Coffee. All rights reserved.</span>
        <span>Made with ♥ in Surat, Gujarat</span>
      </div>
    </footer>
  )
}
