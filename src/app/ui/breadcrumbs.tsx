'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from 'app/styles/ui/breadcrumbs.module.css'

type Props = {
  articleTitle?: string
}

export default function Breadcrumbs({ articleTitle }: Props) {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) return null

  return (
    <div className="container">
      <nav className={styles.breadcrumbs}>
        <Link href="/" className={styles.link}>
          Главная
        </Link>

        {segments[0] === 'article' && articleTitle ? (
          <>
            <span className={styles.separator}> / </span>
            <Link href="/news" className={styles.link}>
              Новости
            </Link>
            <span className={styles.separator}> / </span>
            <span className={styles.link}>{articleTitle}</span>
          </>
        ) : (
          segments.map((segment, i) => {
            const href = '/' + segments.slice(0, i + 1).join('/')
            const label = decodeURIComponent(segment)

            return (
              <span key={href}>
                <span className={styles.separator}> / </span>
                <Link href={href} className={styles.link}>
                  {label === 'news' ? 'Новости' : label === 'about' ? 'О компании' : label}
                </Link>
              </span>
            )
          })
        )}
      </nav>
    </div>
  )
}
