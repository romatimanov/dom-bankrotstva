'use client'

import style from 'app/styles/news.module.css'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Button } from 'app/ui/button'
import { NewsCard } from 'app/ui/newsCard'
import { formatDate } from 'app/utils/formatedDate'
import { useRouter } from 'next/navigation'
import { useGetArticlesQuery } from 'app/api/articlesApi'
import { HomeBanner } from '../homeBanner'
import { ModalProps } from 'app/type/modal'
import { renderPagination } from '../pagination'
import { formatTitleToUrl } from 'app/utils/formatUrl'
import { ButtonBg } from 'app/ui/buttonBg'

export function Articles({ setIsOpen }: ModalProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data: articles = [] } = useGetArticlesQuery()
  const router = useRouter()
  const tags = ['#Банкротство', '#Полное списание долгов', '#Судебная практика', '#Защита прав']
  const perPage = searchQuery || activeTag ? 3 : 8
  const [randomNews, setRandomNews] = useState<any | null>(null)

  useEffect(() => {
    if (articles.length > 0) {
      const index = Math.floor(Math.random() * articles.length)
      setRandomNews(articles[index])
    }
  }, [articles])

  function extractOnlyFirstH2(html: string): string {
    const match = html.match(/<h2[^>]*>[\s\S]*?<\/h2>/i)
    return match ? match[0] : ''
  }

  const handleTagClick = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag))
  }
  const handleClick = (title: string) => {
    const formatted = formatTitleToUrl(title)
    router.push(`/article?title=${formatted}`)
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearch = () => {
    setSearchQuery(search)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, activeTag])

  const filteredArticles = articles.filter((article) => {
    const lowerSearch = searchQuery.toLowerCase()
    const lowerTags = article.tags?.toLowerCase() ?? ''
    const lowerTitle = article.title.toLowerCase()
    const matchesSearch =
      !searchQuery || lowerTitle.includes(lowerSearch) || lowerTags.includes(lowerSearch)
    const matchesTag = !activeTag || lowerTags.includes(activeTag.toLowerCase())
    return matchesSearch && matchesTag
  })

  const totalPages = Math.ceil(filteredArticles.length / perPage)
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  )

  return (
    <section className={style.articles}>
      <div className="container">
        <div className="text-group">
          <h2 className="global-subtitle">
            СТАТЬИ ПО СПИСАНИЮ <br /> КРЕДИТОВ И ДОЛГОВ
          </h2>
          <p className="global-text">
            В мире законов незнание не освобождает от ответственности, но знание — даёт
            преимущества.
          </p>
        </div>
        <div className={style.content}>
          <div className={style.main}>
            <div className={style.tags}>
              <p className={style.tagsTitle}>Популярные теги:</p>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={clsx(style.tag, {
                    [style.activeTag]: activeTag === tag
                  })}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className={style.groupSearch}>
              <div className={style.search}>
                <img src="/search.png" alt="search" />
                <input
                  className={style.input}
                  placeholder="Введите ваш запрос"
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
              <Button onClick={handleSearch} styles={style.btn}>
                Найти
              </Button>
            </div>

            <div className={style.articleInfo} onClick={() => handleClick(randomNews?.title)}>
              <img
                className={style.image}
                src={randomNews?.image_url ? randomNews?.image_url : '/article.png'}
                alt="image"
              />
              <div className={style.infoArticle}>
                <h2 className={style.title}>{randomNews?.title}</h2>
                {randomNews?.content && (
                  <div
                    className={style.text}
                    dangerouslySetInnerHTML={{ __html: extractOnlyFirstH2(randomNews.content) }}
                  />
                )}
                <div className={style.line}>
                  <span className={style.lineContent}>{formatDate(randomNews?.created_at)}</span>
                  <span className={style.lineContent}>
                    <img src="/icon/view.svg" alt="view" />
                    {randomNews?.views}
                  </span>
                  {randomNews?.tags.split(',').map((tag: string) => (
                    <span key={tag} className={style.lineContent}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className={style.cards}>
              {paginatedArticles.length > 0 ? (
                <>
                  <div
                    className={clsx({
                      [style.searchResultCards]: !!searchQuery || !!activeTag,
                      [style.cardContent]: !searchQuery && !activeTag
                    })}
                  >
                    {paginatedArticles.map((article) => (
                      <NewsCard
                        key={article.id}
                        id={article.id}
                        slug={article.slug}
                        img={article.image_url ? article.image_url : '/article.png'}
                        title={article.title}
                        tags={article.tags}
                        date={formatDate(article.created_at)}
                        likes={article.likes}
                        views={article.views}
                      />
                    ))}
                  </div>
                  {renderPagination({
                    currentPage,
                    setCurrentPage,
                    totalPages,
                    style
                  })}
                </>
              ) : (
                <div className={style.notFound}>
                  <h4 className={style.notFoundTitle}>
                    К сожалению, по вашему запросу ничего не найдено :(
                  </h4>
                  <p className={style.notFoundText}>
                    Введите другой запрос или ознакомьтесь со статьями на странице{' '}
                    <span className={style.notFoundLink} onClick={() => router.push('/news')}>
                      Новости
                    </span>
                  </p>
                </div>
              )}
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
            {!searchQuery && paginatedArticles.length > 0 && (
              <div className={style.asideBanner}>
                <h4 className={style.asideBannerTitle}>
                  Получите консультацию юриста по вашей проблеме
                </h4>
                <p className={style.asideBannerText}>
                  Оставьте заявку и наш юрист вас проконсультирует в течение 10 минут
                </p>
                <ButtonBg onClick={() => setIsOpen(true)}>Списать долги сейчас</ButtonBg>
              </div>
            )}
          </aside>
        </div>
      </div>
      <HomeBanner
        title={'Подпишитесь на рассылку'}
        text={
          'Нашим читателям нравятся лёгкий стиль изложения, отсутствие спама и возможность отказаться от рассылки в любой момент. Присоединяйтесь!'
        }
        btn={'Подписаться'}
        onClick={() => setIsOpen(true)}
      />
    </section>
  )
}
