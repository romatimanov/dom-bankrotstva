'use client'
import style from 'app/styles/news.module.css'
import { useEffect } from 'react'

export function Info() {
  useEffect(() => {
    document.title = 'Новости'
  }, [])
  return (
    <section className={style.info}>
      <div className="container">
        <div className={style.textGroup}>
          <h1 className="global-title global-title--add">
            Разбираем сложные юридические вопросы простыми словами
          </h1>
        </div>
      </div>
    </section>
  )
}
