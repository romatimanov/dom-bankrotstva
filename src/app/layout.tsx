import './globals.css'
import { Providers } from './providers/provider'
import LayoutWrapper from './components/layoutWrapperClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico'
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
        <div id="modal-root" />
      </body>
    </html>
  )
}
