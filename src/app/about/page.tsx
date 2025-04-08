import { ClientAboutPage } from 'app/components/about/clientAboutPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '20 лет защищаем права клиентов в самых сложных ситуациях',
  description: 'Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов',
  openGraph: {
    title: '20 лет защищаем права клиентов в самых сложных ситуациях',
    description: 'Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов',
    url: 'https://dombankrot.com/about',
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
    title: '20 лет защищаем права клиентов в самых сложных ситуациях',
    description: 'Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов',
    images: ['https://dombankrot.com/logo.webp']
  },
  alternates: {
    canonical: 'https://dombankrot.com/about'
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

export default function About() {
  return <ClientAboutPage />
}
