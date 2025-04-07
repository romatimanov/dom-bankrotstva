'use client'
import style from 'app/styles/about.module.css'
import { useEffect } from 'react'

export function Info() {
  useEffect(() => {
    document.title = 'О компании'
  }, [])
  return (
    <section className={style.info}>
      <div className="container">
        <div className={style.textGroup}>
          <h1 className="global-title global-title--add">
            20 лет защищаем права клиентов в самых сложных ситуациях
          </h1>
        </div>
      </div>
    </section>
  )
}
