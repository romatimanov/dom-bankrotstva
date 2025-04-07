'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import style from 'app/styles/article.module.css'
import Breadcrumbs from 'app/ui/breadcrumbs'
import { useAddViewMutation, useGetArticlesQuery } from 'app/api/articlesApi'
import { ButtonBg } from 'app/ui/buttonBg'
import { formatTitleToUrl } from 'app/utils/formatUrl'
import { Asnwer } from 'app/components/asnwer'
import Modal from 'app/components/modal'
import ModalSuccess from 'app/components/modalSuccess'
import { Article } from 'app/interfaces/articles'

interface PostProps {
  article: Article
}

export function Post({ article }: PostProps) {
  const router = useRouter()
  const [parsedContent, setParsedContent] = useState<string>('')
  const [isOpenFormModal, setIsOpenFormModal] = useState(false)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)
  const [headings, setHeadings] = useState<{ text: string; id: string }[]>([])

  const { data: articles = [], refetch: refetchArticles } = useGetArticlesQuery()
  const [addView] = useAddViewMutation()

  useEffect(() => {
    if (!article?.id) return
    addView(String(article.id))
  }, [article?.id])

  useEffect(() => {
    if (!article?.content) return

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

    setHeadings(headingsArray)
    setParsedContent(doc.body.innerHTML)
  }, [article])

  const handleClick = (title: string) => {
    const formatted = formatTitleToUrl(title)
    router.push(`/article/${formatted}`)
  }

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
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />

            <div className={style.articleBanner}>
              <div className={style.articleBannerContent}>
                <h3 className={style.articleBannerTitle}>Остались вопросы?</h3>
                <p className={style.articleBannerText}>Получите бесплатную консультацию юриста!</p>
              </div>
              <ButtonBg onClick={() => setIsOpenFormModal(true)}>Хочу списать долг</ButtonBg>
            </div>

            <div className={style.related}>
              <h3 className={style.relatedTitle}>Статьи по теме</h3>
              <ul className={style.relatedList}>
                {articles
                  .filter((a) => a.id !== article.id)
                  .filter((a) => {
                    const currentTags = article.tags?.split(' ').map((tag: string) => tag.trim())
                    const otherTags = a.tags?.split(' ').map((tag: string) => tag.trim())
                    return currentTags?.some((tag: string) => otherTags?.includes(tag))
                  })
                  .slice(0, 5)
                  .map((relatedArticle) => (
                    <li
                      key={relatedArticle.id}
                      className={style.relatedItem}
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
                  .filter((a) => {
                    const now = new Date()
                    const weekAgo = new Date()
                    weekAgo.setDate(now.getDate() - 7)
                    return new Date(a.created_at) >= weekAgo
                  })
                  .map((a) => (
                    <li key={a.id} className={style.asideItem} onClick={() => handleClick(a.title)}>
                      {a.title}
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
