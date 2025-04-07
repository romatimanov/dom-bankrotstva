import { ClientNewsPage } from 'app/components/news/clientNewsPage'

export const metadata = {
  title: 'Разбираем сложные юридические вопросы простыми словами',
  description: 'Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов',
  openGraph: {
    title: 'Разбираем сложные юридические вопросы простыми словами',
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
    title: 'Разбираем сложные юридические вопросы простыми словами',
    description: 'Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов',
    images: ['localhost:3000/logo.webp']
  }
}

export default function News() {
  return (
    <>
      <ClientNewsPage />
    </>
  )
}
