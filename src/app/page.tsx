import { ClientPage } from './components/clientPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Банкротство физических лиц под ключ',
  description: 'Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов',
  openGraph: {
    title: 'Банкротство физических лиц под ключ',
    description: 'Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов',
    url: 'https://dombankrot.com',
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
    title: 'Банкротство физических лиц под ключ',
    description: 'Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов',
    images: ['https://dombankrot.com/logo.webp']
  },
  alternates: {
    canonical: 'https://dombankrot.com'
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
  }
}

export default function Home() {
  return <ClientPage />
}
