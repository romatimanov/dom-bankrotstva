'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import style from 'app/styles/article.module.css'
import Breadcrumbs from 'app/ui/breadcrumbs'
import { useAddViewMutation, useGetArticlesQuery } from 'app/api/articlesApi'
import { ButtonBg } from 'app/ui/buttonBg'
import { formatTitleToUrl } from 'app/utils/formatUrl'
import { Asnwer } from 'app/components/asnwer'
import Modal from 'app/components/modal'
import ModalSuccess from 'app/components/modalSuccess'

export default function Article() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('title')
  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [headings, setHeadings] = useState<{ text: string; id: string }[]>([])
  const { data: articles = [], refetch } = useGetArticlesQuery()
  const router = useRouter()
  const [isOpenFormModal, setIsOpenFormModal] = useState(false)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)
  const [addView] = useAddViewMutation()

  function extractOnlyFirstH2Text(html: string | undefined | null): string {
    if (!html) return ''
    const match = html.match(/<h2[^>]*>(.*?)<\/h2>/i)
    return match ? match[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : ''
  }

  const handleClick = (title: string) => {
    const formatted = formatTitleToUrl(title)
    router.push(`/article?title=${formatted}`)
  }

  useEffect(() => {
    document.title = article?.title ?? 'Разбираем сложные юридические вопросы простыми словами'

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) || document.createElement('meta')
      tag.setAttribute('name', name)
      tag.setAttribute('content', content)
      if (!tag.parentElement) document.head.appendChild(tag)
    }
    setMeta('title', article?.title ?? 'Разбираем сложные юридические вопросы простыми словами')
    setMeta(
      'description',
      extractOnlyFirstH2Text(article?.content) ||
        'Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов'
    )

    setMeta('keywords', 'банкротство, долги, коллекторы')
  }, [article])

  useEffect(() => {
    const channel = new BroadcastChannel('article_channel')

    channel.onmessage = (event) => {
      const { slug } = event.data
      if (!slug) return

      refetch()

      fetch(`http://localhost:8000/get_article.php?slug=${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setArticle(data.data)
            setLoading(false)
          }
        })
        .catch(() => setLoading(false))
    }

    return () => channel.close()
  }, [refetch])

  useEffect(() => {
    if (slug) {
      setLoading(true)
      fetch(`http://localhost:8000/get_article.php?slug=${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setArticle(data.data)

            addView(data.data.id.toString())
          } else {
            setArticle(null)
          }
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [slug])

  useEffect(() => {
    if (article?.content) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(article.content, 'text/html')
      const h2s = doc.querySelectorAll('h2')

      const headingsArray: { text: string; id: string }[] = []

      h2s.forEach((h2, index) => {
        const text = h2.textContent || `section-${index}`
        const id = `section-${index}`
        h2.setAttribute('id', id)
        headingsArray.push({ text, id })
      })

      article.content = doc.body.innerHTML
      setHeadings(headingsArray)
    }
  }, [article])

  if (loading) return <p style={{ padding: 40 }}>Загрузка...</p>
  if (!article) return <p style={{ padding: 40 }}>Статья не найдена</p>

  return (
    <div className={style.article}>
      <div className="container">
        <Breadcrumbs articleTitle={article.title} />
        <div className="text-group">
          <h1 className="global-subtitle">{article.title}</h1>
        </div>
        <div className={style.articleContainer}>
          <div className={style.articleWrapper}>
            {headings.length > 0 && (
              <div className={style.articleInfo}>
                <h4 className={style.articleInfoTitle}>Содержание</h4>
                <ul className={style.articleToc}>
                  {headings.map(({ text, id }) => (
                    <li key={id} className={style.articleTocItem}>
                      <a href={`#${id}`}>{text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className={style.articleText}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            <div className={style.articleBanner}>
              <div className={style.articleBannerContent}>
                <h3 className={style.articleBannerTitle}>Остались вопросы?</h3>
                <p className={style.articleBannerText}>Получите бесплатную консультацию юриста! </p>
              </div>
              <ButtonBg onClick={() => setIsOpenFormModal(true)}>Хочу списать долг</ButtonBg>
            </div>
            <div className={style.related}>
              <h3 className={style.relatedTitle}>Статьи по теме</h3>
              <ul className={style.relatedList}>
                {articles
                  .filter((a) => a.category === article.category && a.id !== article.id)
                  .slice(0, 5)
                  .map((relatedArticle) => (
                    <li
                      className={style.relatedItem}
                      key={relatedArticle.id}
                      onClick={() => handleClick(relatedArticle.title)}
                    >
                      <img src="/icon/arrow-news.svg" alt="arrow" />
                      {relatedArticle.title}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <aside className={style.aside}>
            <div className={style.asideContent}>
              <h4 className={style.asideTitle}>Новости за неделю</h4>
              <ul className={style.asideList}>
                {articles
                  .filter((article) => {
                    const now = new Date()
                    const weekAgo = new Date()
                    weekAgo.setDate(now.getDate() - 7)
                    return new Date(article.created_at) >= weekAgo
                  })
                  .map((article) => (
                    <li
                      className={style.asideItem}
                      key={article.id}
                      onClick={() => handleClick(article.title)}
                    >
                      {article.title}
                    </li>
                  ))}
              </ul>
            </div>
            <div className={style.asideBanner}>
              <h4 className={style.asideBannerTitle}>
                Получите консультацию юриста по вашей проблеме
              </h4>
              <p className={style.asideBannerText}>
                Оставьте заявку и наш юрист вас проконсультирует в течение 10 минут
              </p>
              <ButtonBg onClick={() => setIsOpenFormModal(true)}>Списать долги сейчас</ButtonBg>
            </div>
          </aside>
        </div>
        <Asnwer />
      </div>
      <Modal
        isOpen={isOpenFormModal}
        onClose={() => setIsOpenFormModal(false)}
        onSuccess={() => {
          setIsOpenFormModal(false)
          setIsOpenSuccessModal(true)
        }}
      />
      <ModalSuccess isOpen={isOpenSuccessModal} onClose={() => setIsOpenSuccessModal(false)} />
    </div>
  )
}
