import { ClientNewsPage } from 'app/components/news/clientNewsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Разбираем сложные юридические вопросы простыми словами',
  description: 'Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов',
  keywords: ['банкротство', 'юридическая помощь', 'долги', 'защита от коллекторов'],
  openGraph: {
    title: 'Разбираем сложные юридические вопросы простыми словами',
    description: 'Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов',
    url: 'https://dombankrot.com/news',
    type: 'website',
    images: [
      {
        url: 'https://dombankrot.com/logo.webp',
        width: 1200,
        height: 630,
        alt: 'Дом Банкротства'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Разбираем сложные юридические вопросы простыми словами',
    description: 'Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов',
    images: ['https://dombankrot.com/logo.webp']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    }
  },
  alternates: {
    canonical: 'https://dombankrot.com/news'
  }
}

export default function News() {
  return <ClientNewsPage />
}
