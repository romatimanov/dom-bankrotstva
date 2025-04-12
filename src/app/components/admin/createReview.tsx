'use client'

import {
  useCreateReviewMutation,
  useGetReviewsQuery,
  useUpdateReviewMutation
} from 'app/api/reviewsApi'
import style from 'app/styles/admin.module.css'
import { useEffect, useState } from 'react'
import { Reviews } from './reviews'

type CreateReviewProps = {
  setActiveTab: (
    v: 'create' | 'list' | 'createReview' | 'reviews' | 'contacts' | 'createTeam' | 'team'
  ) => void
  activeTab: 'create' | 'list' | 'createReview' | 'reviews' | 'contacts' | 'createTeam' | 'team'
  showModal: (text: string, onConfirm: () => void, onCancel?: () => void) => void
  setReviewId: (v: number | null) => void
  reviewId: number | null
}

export default function CreateReview({
  setActiveTab,
  activeTab,
  showModal,
  setReviewId,
  reviewId
}: CreateReviewProps) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [price, setPrice] = useState('')
  const [dataend, setDate] = useState('')
  const [updateReview] = useUpdateReviewMutation()
  const [createReview] = useCreateReviewMutation()
  const { refetch: refetchReview } = useGetReviewsQuery()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !text || !dataend || !name || !city || !price) {
      alert('Заполните заголовок, текст и теги')
      return
    }

    try {
      if (reviewId !== null) {
        const res = await updateReview({
          id: reviewId,
          data: {
            title,
            text,
            dataend,
            name,
            city,
            price
          }
        }).unwrap()

        if (!res.success) {
          return
        }
      } else {
        const res = await createReview({
          title,
          text,
          dataend,
          name,
          city,
          price
        }).unwrap()

        if (!res.success) {
          alert('Ошибка создания статьи: ' + res.error)
          return
        }
      }

      refetchReview()
      resetForm()
      setActiveTab('reviews')
    } catch (err: any) {
      alert('Ошибка при сохранении: ')
      console.error(err)
    }
  }

  const resetForm = () => {
    setTitle('')
    setText('')
    setName('')
    setCity('')
    setPrice('')
    setDate('')
    setReviewId(null)
  }

  useEffect(() => {
    if (!reviewId && activeTab === 'createReview') {
      resetForm()
    }
  }, [reviewId, activeTab])

  return (
    <>
      <section>
        {activeTab === 'createReview' && (
          <div>
            <h2 className={style.globalTitle}>Написать отзыв</h2>
            <form onSubmit={handleSubmit} className={style.form}>
              <input
                type="text"
                placeholder="Заголовок"
                className={style.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Текст"
                className={style.input}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <input
                type="text"
                placeholder="Дата завершения дела"
                className={style.input}
                value={dataend}
                onChange={(e) => setDate(e.target.value)}
              />

              <input
                type="text"
                placeholder="Списанная сумма"
                className={style.input}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="text"
                placeholder="Имя"
                className={style.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Город"
                className={style.input}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <button type="submit" className={style.button}>
                {reviewId ? 'Сохранить изменения' : 'Сохранить'}
              </button>
            </form>
          </div>
        )}
        {activeTab === 'reviews' && (
          <Reviews
            setActiveTab={setActiveTab}
            showModal={showModal}
            setCity={setCity}
            setDate={setDate}
            setName={setName}
            setPrice={setPrice}
            setText={setText}
            setTitle={setTitle}
            setReviewId={setReviewId}
          />
        )}
      </section>
    </>
  )
}
