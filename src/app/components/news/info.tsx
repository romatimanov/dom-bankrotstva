'use client'
import style from 'app/styles/news.module.css'
import { useEffect } from 'react'

export function Info() {
  useEffect(() => {
    document.title = 'Новости'

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) || document.createElement('meta')
      tag.setAttribute('name', name)
      tag.setAttribute('content', content)
      if (!tag.parentElement) document.head.appendChild(tag)
    }

    setMeta('title', 'Разбираем сложные юридические вопросы простыми словами')
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
          <h1 className="global-title">Разбираем сложные юридические вопросы простыми словами</h1>
        </div>
      </div>
    </section>
  )
}
