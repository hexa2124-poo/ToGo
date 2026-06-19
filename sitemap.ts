import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://togocoffee.in'
  return [
    { url: base,             lastModified: new Date(), changeFrequency: 'daily',  priority: 1 },
    { url: `${base}/menu`,   lastModified: new Date(), changeFrequency: 'daily',  priority: 0.9 },
  ]
}
