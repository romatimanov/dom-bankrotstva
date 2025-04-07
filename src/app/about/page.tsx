import { ClientAboutPage } from 'app/components/about/clientAboutPage'

export const metadata = {
  title: '20 лет защищаем права клиентов в самых сложных ситуациях',
  description: 'Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов',
  openGraph: {
    title: '20 лет защищаем права клиентов в самых сложных ситуациях',
    description: 'Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов',
    url: 'localhost:3000/',
    type: 'website',
    images: [
      {
        url: 'localhost:3000/logo.webp',
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
    images: ['ocalhost:3000/logo.webp']
  }
}

export default function About() {
  return (
    <>
      <ClientAboutPage />
    </>
  )
}
