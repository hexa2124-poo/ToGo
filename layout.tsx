import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://togocoffee.in'),
  title: {
    default: 'To Go Coffee — Fresh Coffee. Fast Service. Anytime.',
    template: '%s | To Go Coffee',
  },
  description:
    'Premium mobile coffee cart in Vesu, Surat. Espresso, Cold Brew, Matcha, Frappes & more. 4.7★ on Google. Open 5 PM–12 AM.',
  keywords: [
    'coffee surat', 'to go coffee', 'cold brew surat', 'coffee cart vesu',
    'best coffee surat', 'matcha latte surat', 'frappe surat', 'togocoffee',
  ],
  authors: [{ name: 'To Go Coffee' }],
  creator: 'To Go Coffee',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://togocoffee.in',
    siteName: 'To Go Coffee',
    title: 'To Go Coffee — Fresh Coffee. Fast Service. Anytime.',
    description: 'Premium mobile coffee in Vesu, Surat. Open 5 PM–12 AM.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'To Go Coffee' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'To Go Coffee',
    description: 'Premium mobile coffee cart in Surat.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/apple-touch-icon.png',
  },
  other: {
    'google-site-verification': process.env.NEXT_PUBLIC_GSC_ID ?? '',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFF8F0' },
    { media: '(prefers-color-scheme: dark)',  color: '#111827' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer=window.dataLayer||[];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js',new Date());
                  gtag('config','${gaId}',{page_path:window.location.pathname});
                `,
              }}
            />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CafeOrCoffeeShop',
              name: 'To Go Coffee',
              description: 'Premium Mobile Coffee Cart & Beverage Brand',
              url: 'https://togocoffee.in',
              telephone: '+91-83470-23216',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Phoenix Market, Opp. Aagam Viviana, Near Florance Apartment',
                addressLocality: 'Vesu',
                addressRegion: 'Surat, Gujarat',
                postalCode: '395007',
                addressCountry: 'IN',
              },
              openingHours: 'Mo-Su 17:00-00:00',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.7',
                reviewCount: '58',
              },
              sameAs: ['https://www.instagram.com/togocoffee.in'],
              servesCuisine: 'Coffee, Beverages',
              priceRange: '₹₹',
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
