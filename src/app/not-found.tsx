'use client'

import { useRouter } from 'next/navigation'
import style from './styles/notPage.module.css'

export default function NotFound() {
  const route = useRouter()
  return (
    <div className={style.notfoundContainer}>
      <h1>404</h1>
      <p>Упс! Страница не найдена.</p>
      <button onClick={() => route.push('/')} className={style.button}>
        На главную
      </button>
    </div>
  )
}
