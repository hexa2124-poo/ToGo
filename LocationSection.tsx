'use client'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Navigation, MessageCircle } from 'lucide-react'
import { SITE_CONFIG, getBusinessStatus } from '@/lib/utils'
import { trackEvent } from '@/lib/api'

export default function LocationSection() {
  const status = getBusinessStatus()

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden h-80 lg:h-[420px] bg-gradient-to-br from-coffee/30 to-primary/20 flex items-center justify-center shadow-card"
        >
          <iframe
            title="To Go Coffee location"
            src="https://maps.google.com/maps?q=Vesu,Surat,Gujarat&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <p className="text-secondary text-xs uppercase tracking-[0.2em] font-medium mb-2">Visit Us</p>
            <h2 className="font-heading text-4xl font-bold">Find To Go Coffee</h2>
          </div>

          <div className="space-y-4">
            <InfoRow icon={<MapPin size={18} />} title="Address">
              {SITE_CONFIG.address}
            </InfoRow>
            <InfoRow icon={<Clock size={18} />} title="Hours">
              <span className="flex items-center gap-2">
                {SITE_CONFIG.openTime} – {SITE_CONFIG.closeTime} · Daily
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                  status.isOpen ? 'bg-success/15 text-success' : 'bg-muted text-muted-foreground'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${status.isOpen ? 'bg-success' : 'bg-muted-foreground'}`} />
                  {status.isOpen ? 'Open Now' : 'Closed'}
                </span>
              </span>
            </InfoRow>
            <InfoRow icon={<Phone size={18} />} title="Phone">
              <a href="tel:+918347023216" className="hover:text-primary transition-colors">
                {SITE_CONFIG.phone}
              </a>
            </InfoRow>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={SITE_CONFIG.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('google_maps_click')}
              className="flex items-center gap-2 bg-primary text-cream px-5 py-3 rounded-xl text-sm font-medium hover:bg-primary-light transition-colors"
            >
              <Navigation size={16} /> Get Directions
            </a>
            <a
              href="https://wa.me/918347023216"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click')}
              className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-[#1DAE53] transition-colors"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a
              href="tel:+918347023216"
              onClick={() => trackEvent('call_click')}
              className="flex items-center gap-2 border border-border px-5 py-3 rounded-xl text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <Phone size={16} /> Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function InfoRow({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{title}</p>
        <p className="text-sm mt-0.5 text-foreground/90">{children}</p>
      </div>
    </div>
  )
}
