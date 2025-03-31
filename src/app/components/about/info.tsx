'use client'
import style from 'app/styles/about.module.css'
import { useEffect } from 'react'

export function Info() {
  useEffect(() => {
    document.title = 'О компании'

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) || document.createElement('meta')
      tag.setAttribute('name', name)
      tag.setAttribute('content', content)
      if (!tag.parentElement) document.head.appendChild(tag)
    }
    setMeta('title', '20 лет защищаем права клиентов в самых сложных ситуациях')
    setMeta(
      'description',
      'Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов'
    )
    setMeta('keywords', 'банкротство, долги, коллекторы')
    setMeta('robots', 'index, follow')
  }, [])
  return (
    <section className={style.info}>
      <div className="container">
        <div className={style.textGroup}>
          <h1 className="global-title">20 лет защищаем права клиентов в самых сложных ситуациях</h1>
        </div>
      </div>
    </section>
  )
}
