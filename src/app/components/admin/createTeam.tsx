'use client'

import style from 'app/styles/admin.module.css'
import { useEffect, useState } from 'react'
import { Team } from './team'
import {
  useCreateTeamMutation,
  useDeleteImageMutation,
  useGetTeamQuery,
  useUpdateTeamMutation
} from 'app/api/teamApi'

type CreateReviewProps = {
  setActiveTab: (
    v: 'create' | 'list' | 'createReview' | 'reviews' | 'contacts' | 'createTeam' | 'team'
  ) => void
  activeTab: 'create' | 'list' | 'createReview' | 'reviews' | 'contacts' | 'createTeam' | 'team'
  showModal: (text: string, onConfirm: () => void, onCancel?: () => void) => void
  setTeamId: (v: number | null) => void
  teamId: number | null
}

export default function CreateTeam({
  setActiveTab,
  activeTab,
  showModal,
  setTeamId,
  teamId
}: CreateReviewProps) {
  const [image, setImage] = useState('')
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [updateTeam] = useUpdateTeamMutation()
  const [createTeam] = useCreateTeamMutation()
  const { refetch: refetchTeam } = useGetTeamQuery()
  const [deleteImage] = useDeleteImageMutation()

  const [isUploading, setIsUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !position || !text) {
      alert('Заполните заголовок, текст должность')
      return
    }

    if (isUploading) {
      alert('Пожалуйста, дождитесь загрузки изображения')
      return
    }

    try {
      if (teamId !== null && teamId !== undefined) {
        const res = await updateTeam({
          id: teamId,
          data: {
            name,
            position,
            text,
            image: image
          }
        }).unwrap()

        if (!res.success) {
          return
        }
      } else {
        const res = await createTeam({
          name,
          position,
          text,
          image: image
        }).unwrap()

        if (!res.success) {
          alert('Ошибка создания статьи: ' + res.error)
          return
        }
      }

      refetchTeam()
      resetForm()
      setActiveTab('team')
    } catch (err: any) {
      alert('Ошибка при сохранении: ')
      console.error(err)
    }
  }

  const resetForm = () => {
    setName('')
    setPosition('')
    setText('')
    setImage('')
    setTeamId(null)
  }

  useEffect(() => {
    if (!teamId && activeTab === 'createTeam') {
      resetForm()
    }
  }, [teamId, activeTab])

  return (
    <>
      <section>
        {activeTab === 'createTeam' && (
          <div>
            <h2 className={style.globalTitle}>Добавить сотрудника</h2>
            <form onSubmit={handleSubmit} className={style.form}>
              {image && (
                <div style={{ marginTop: '10px' }}>
                  <p>Текущее изображение:</p>
                  <img src={image} alt="preview" style={{ maxWidth: '300px', display: 'block' }} />
                  <button
                    type="button"
                    className={style.button}
                    onClick={async () => {
                      try {
                        await deleteImage(image).unwrap()
                        setImage('')

                        if (teamId) {
                          await updateTeam({
                            id: teamId,
                            data: { image: '' }
                          }).unwrap()
                          await refetchTeam()
                        }
                      } catch (err: any) {
                        alert(
                          'Ошибка удаления изображения: ' +
                            (err?.data || err?.message || 'Неизвестная')
                        )
                      }
                    }}
                    style={{ marginTop: '10px' }}
                  >
                    Заменить изображение
                  </button>
                </div>
              )}

              {!image && (
                <input
                  type="file"
                  accept="image/*"
                  className={style.input}
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return

                    setIsUploading(true)

                    const formData = new FormData()
                    formData.append('files', file)

                    try {
                      const res = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData
                      })

                      const data = await res.json()

                      if (data.success && data.url) {
                        setImage(data.url)
                      } else {
                        alert('Ошибка загрузки изображения: ' + (data.error || 'Неизвестная'))
                      }
                    } catch (err: any) {
                      alert('Ошибка загрузки изображения: ' + err?.message || 'Неизвестная')
                    } finally {
                      setIsUploading(false)
                    }
                  }}
                />
              )}
              <input
                type="text"
                placeholder="Имя"
                className={style.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Должность"
                className={style.input}
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />

              <input
                type="text"
                placeholder="Описание"
                className={style.input}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <button type="submit" className={style.button}>
                {isUploading ? 'Загрузка...' : teamId ? 'Сохранить изменения' : 'Сохранить'}
              </button>
            </form>
          </div>
        )}
        {activeTab === 'team' && (
          <Team
            setActiveTab={setActiveTab}
            showModal={showModal}
            setPosition={setPosition}
            setImage={setImage}
            setName={setName}
            setText={setText}
            setTeamId={setTeamId}
          />
        )}
      </section>
    </>
  )
}
