'use client'

import { renderPagination } from '../pagination'
import { formatDate } from 'app/utils/formatedDate'
import style from 'app/styles/admin.module.css'
import { useDeleteArticleMutation, useGetArticlesQuery } from 'app/api/articlesApi'
import { useState } from 'react'

type PostsProps = {
  setTitle: (v: string) => void
  setTags: (v: string) => void
  setKeys: (v: string) => void
  setDescription: (v: string) => void
  setContent: (v: string) => void
  setImageUrl: (v: string) => void
  setArticleId: (v: number | null) => void
  setActiveTab: (
    v: 'create' | 'list' | 'createReview' | 'reviews' | 'contacts' | 'createTeam' | 'team'
  ) => void
  showModal: (text: string, onConfirm: () => void, onCancel?: () => void) => void
}

export function Posts({
  setTitle,
  setTags,
  setKeys,
  setDescription,
  setContent,
  setImageUrl,
  setArticleId,
  setActiveTab,
  showModal
}: PostsProps) {
  const { data: articles = [], refetch: refetchArticles } = useGetArticlesQuery()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const perPage = 15
  const totalPages = Math.ceil(articles.length / perPage)
  const paginatedArticles = articles.slice((currentPage - 1) * perPage, currentPage * perPage)
  const [deleteArticle] = useDeleteArticleMutation()

  const handleDelete = (id: number) => {
    showModal('Вы уверены, что хотите удалить эту статью?', async () => {
      try {
        const res = await deleteArticle(id).unwrap()
        if (res.success || res.message) {
          refetchArticles()
        } else {
          showModal('Ошибка при удалении статьи', () => {})
        }
      } catch (err: any) {
        showModal('Ошибка при удалении: ' + (err?.data?.error || 'Неизвестная'), () => {})
        console.error(err)
      }
    })
  }
  const handleEdit = (article: any) => {
    setTitle(article.title)
    setTags(article.tags)
    setKeys(article.metakey || '')
    setDescription(article.metadescription || '')
    setContent(article.content)
    setImageUrl(article.image_url)
    setArticleId(article.id)
    setActiveTab('create')
  }

  return (
    <section>
      <h2 className={style.globalTitle}>Все статьи</h2>
      <div id="articles-list">
        <table className={`${style.articlesTable} ${style.responsiveTable}`}>
          <thead className={style.thead}>
            <tr className={style.row}>
              <th className={style.column}>ID</th>
              <th className={style.column}>Заголовок</th>
              <th className={style.column}>Теги</th>
              <th className={`${style.column} ${style.date}`}>Дата</th>
              <th className={style.column}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {paginatedArticles.map((article) => (
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.title}</td>
                <td>{article.tags}</td>
                <td>{formatDate(article.created_at)}</td>
                <td className={style.actions}>
                  <button onClick={() => handleEdit(article)}>
                    <img src="/icon/edit.svg" alt="edit" />
                  </button>
                  <button onClick={() => handleDelete(article.id)}>
                    <img src="/icon/delete.svg" alt="delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {renderPagination({
          currentPage,
          setCurrentPage,
          totalPages,
          style
        })}
      </div>
    </section>
  )
}
