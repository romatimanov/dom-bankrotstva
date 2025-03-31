import { Suspense } from 'react'
import ClientWrapper from './clientWrapper'

export default function ArticlePage() {
  return (
    <Suspense fallback={<p style={{ padding: 40 }}>Загрузка...</p>}>
      <ClientWrapper />
    </Suspense>
  )
}
