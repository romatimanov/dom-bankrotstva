import './globals.css'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { Providers } from './providers/provider'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <div id="modal-root" />
      </body>
    </html>
  )
}
