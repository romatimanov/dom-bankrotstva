import { ClientPage } from './components/clientPage'

export const metadata = {
  title: 'Банкротство физических лиц под ключ',
  description: 'Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов',
  openGraph: {
    title: 'Банкротство физических лиц под ключ',
    description: 'Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов',
    url: 'ocalhost:3000',
    type: 'website',
    images: [
      {
        url: 'ocalhost:3000logo.webp',
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
    images: ['ocalhost:3000logo.webp']
  }
}

export default function Home() {
  return (
    <>
      <ClientPage />
    </>
  )
}
