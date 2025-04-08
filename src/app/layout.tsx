import './globals.css'
import { Providers } from './providers/provider'
import LayoutWrapper from './components/layoutWrapperClient'

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
