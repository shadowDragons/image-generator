import { SiteConfig } from '@/types/siteConfig'

export const BASE_URL = 'https://image-generator.tool.vin'

const baseSiteConfig = {
  name: 'byte-image-generator',
  description:
    'a powerful tool designed to revolutionize your web development experience. With our intuitive interface, effortlessly upload images, add icons, and create custom shapes to enhance your project visuals. Join the creative revolution and elevate your web projects with our logo generator and design tools. Visit us today to transform your ideas into stunning visuals.',
  url: BASE_URL,
  metadataBase: '/',
  keywords: [],
  authors: [
    {
      name: 'Junexus',
      url: 'https://sphrag.com',
      twitter: 'https://x.com/Junexus_indie',
    },
  ],
  creator: '@Junexus_indie',
  themeColors: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  defaultNextTheme: 'system', // next-theme option: system | dark | light
  icons: {
    icon: '/favicon.ico',
    shortcut: '/logo.png',
    apple: '/logo.png', // apple-touch-icon.png
  },
}

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: 'website',
    locale: 'en-US',
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
    images: [`${baseSiteConfig.url}og.webp`],
  },
  twitter: {
    card: 'summary_large_image',
    title: baseSiteConfig.name,
    site: baseSiteConfig.url,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}og.webp`],
    creator: baseSiteConfig.creator,
  },
}
