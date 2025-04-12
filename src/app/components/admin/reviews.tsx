'use client'

import { renderPagination } from '../pagination'
import style from 'app/styles/admin.module.css'
import { useState } from 'react'
import { useDeleteReviewMutation, useGetReviewsQuery } from 'app/api/reviewsApi'

type ReviewProps = {
  setTitle: (v: string) => void
  setText: (v: string) => void
  setDate: (v: string) => void
  setPrice: (v: string) => void
  setName: (v: string) => void
  setCity: (v: string) => void
  setActiveTab: (
    v: 'create' | 'list' | 'createReview' | 'reviews' | 'contacts' | 'createTeam' | 'team'
  ) => void
  showModal: (text: string, onConfirm: () => void, onCancel?: () => void) => void
  setReviewId: (v: number | null) => void
}

export function Reviews({
  setTitle,
  setText,
  setDate,
  setPrice,
  setName,
  setCity,
  setActiveTab,
  showModal,
  setReviewId
}: ReviewProps) {
  const { data: reviews = [], refetch: refetchReview } = useGetReviewsQuery()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const perPage = 15
  const totalPages = Math.ceil(reviews.length / perPage)
  const paginatedArticles = reviews.slice((currentPage - 1) * perPage, currentPage * perPage)
  const [deleteReview] = useDeleteReviewMutation()

  const handleDelete = (id: number) => {
    showModal('Вы уверены, что хотите удалить отзыв?', async () => {
      try {
        const res = await deleteReview(id).unwrap()
        if (res.success || res.message) {
          refetchReview()
        } else {
          showModal('Ошибка при удалении отзыва', () => {})
        }
      } catch (err: any) {
        showModal('Ошибка при удалении: ' + (err?.data?.error || 'Неизвестная'), () => {})
        console.error(err)
      }
    })
  }
  const handleEdit = (review: any) => {
    setTitle(review.title)
    setText(review.text)
    setDate(review.dataend)
    setPrice(review.price)
    setName(review.name)
    setCity(review.city)
    setReviewId(review.id)
    setActiveTab('createReview')
  }

  return (
    <section>
      <h2 className={style.globalTitle}>Все отзывы</h2>
      <div id="articles-list">
        <table className={`${style.articlesTable} ${style.responsiveTable}`}>
          <thead className={style.thead}>
            <tr className={style.row}>
              <th className={style.column}>Заголовок</th>
              <th className={style.column}>Текст</th>
              <th className={`${style.column} ${style.date}`}>Дата</th>
              <th className={style.column}>Цена</th>
              <th className={style.column}>Имя</th>
              <th className={style.column}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {paginatedArticles.map((reviews) => (
              <tr key={reviews.id}>
                <td>{reviews.title}</td>
                <td className={style.textReview}>{reviews.text}</td>
                <td>{reviews.dataend}</td>
                <td>{reviews.price}</td>
                <td>{reviews.name}</td>
                <td className={style.actions}>
                  <button onClick={() => handleEdit(reviews)}>
                    <img src="/icon/edit.svg" alt="edit" />
                  </button>
                  <button onClick={() => handleDelete(reviews.id)}>
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
