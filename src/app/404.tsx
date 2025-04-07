'use client'

import style from './styles/notPage.module.css'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className={style.notfoundContainer}>
      <h1>404</h1>
      <p>Упс! Страница не найдена.</p>
      <Link href="/" className={style.button}>
        На главную
      </Link>
    </div>
  )
}
