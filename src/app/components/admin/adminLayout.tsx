'use client'

import { useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import style from 'app/styles/admin.module.css'
import {
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useGetArticlesQuery
} from 'app/api/articlesApi'
import { renderPagination } from '../pagination'
import { formatDate } from 'app/utils/formatedDate'
import ModalAdmin from '../modalAdmin'

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

export default function AdminLayout({ placeholder }: { placeholder?: string }) {
  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [metakey, setKeys] = useState('')
  const [metadescription, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const perPage = 15
  const editor = useRef(null)
  const { data: articles = [], refetch: refetchArticles } = useGetArticlesQuery()
  const [deleteArticle] = useDeleteArticleMutation()
  const [createArticle] = useCreateArticleMutation()
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)

  const totalPages = Math.ceil(articles.length / perPage)
  const paginatedArticles = articles.slice((currentPage - 1) * perPage, currentPage * perPage)

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Начните ввод...',
      toolbarSticky: false,
      language: 'ru'
    }),
    [placeholder]
  )

  const editorRef = useRef<any>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [modalText, setModalText] = useState('')
  const [onModalConfirm, setOnModalConfirm] = useState<() => void>(() => () => {})
  const [onModalCancel, setOnModalCancel] = useState<() => void>(() => () => {})

  const showModal = (text: string, onConfirm: () => void, onCancel?: () => void) => {
    setModalText(text)
    setOnModalConfirm(() => () => {
      onConfirm()
      setIsOpen(false)
    })
    setOnModalCancel(() => () => {
      if (onCancel) onCancel()
      setIsOpen(false)
    })
    setIsOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !content || !tags) {
      showModal('Заполните заголовок, текст и теги', () => {})
      return
    }

    if (isUploading) {
      showModal('Пожалуйста, дождитесь загрузки изображения', () => {})
      return
    }

    try {
      const res = await createArticle({
        title,
        content,
        tags,
        metakey,
        metadescription,
        image_url: imageUrl
      }).unwrap()

      if (res.success || res.message) {
        refetchArticles()
        setTitle('')
        setTags('')
        setKeys('')
        setDescription('')
        setContent('')
        setImageUrl('')
        if (editorRef.current) {
          editorRef.current.value = ''
        }
        setActiveTab('list')
      } else {
        showModal('Ошибка: ' + res.error, () => {})
      }
    } catch (err: any) {
      showModal('Ошибка при сохранении: ' + (err?.data?.error || 'Неизвестная'), () => {})
      console.error(err)
    }
  }

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
    setActiveTab('create')
  }

  return (
    <>
      <div className={style.adminLayout}>
        <aside className={style.sidebar}>
          <ul className={style.sidebarMenu}>
            <li>
              <button className={style.sidebarButton} onClick={() => setActiveTab('create')}>
                Создать статью
              </button>
            </li>
            <li>
              <button className={style.sidebarButton} onClick={() => setActiveTab('list')}>
                Все статьи
              </button>
            </li>
            <button
              className={style.sidebarButton}
              onClick={async () => {
                await fetch('/api/admin/logout', { method: 'POST' })
                router.push('/')
              }}
            >
              Выйти
            </button>
          </ul>
        </aside>

        <main className={style.mainContent}>
          {activeTab === 'create' && (
            <section>
              <h2 className={style.globalTitle}>Создать статью</h2>
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
                  placeholder="#тег1, #тег2"
                  className={style.input}
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="meta ключи"
                  className={style.input}
                  value={metakey}
                  onChange={(e) => setKeys(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="meta описание"
                  className={style.input}
                  value={metadescription}
                  onChange={(e) => setDescription(e.target.value)}
                />

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
                      const res = await fetch('/api/upload/', {
                        method: 'POST',
                        body: formData
                      })

                      const data = await res.json()

                      if (data.success && data.url) {
                        setImageUrl(data.url)
                      } else {
                        showModal('Ошибка загрузки изображения', () => {})
                      }
                    } catch (err) {
                      showModal('Ошибка запроса загрузки', () => {})
                    } finally {
                      setIsUploading(false)
                    }
                  }}
                />

                {imageUrl && (
                  <div style={{ marginTop: '10px' }}>
                    <p>Изображение:</p>
                    <img src={imageUrl} alt="preview" style={{ maxWidth: '300px' }} />
                  </div>
                )}

                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  tabIndex={1}
                  onBlur={(newContent) => setContent(newContent)}
                  onChange={() => {}}
                  className={style.editor}
                />

                <br />
                <button type="submit" className={style.button} disabled={isUploading}>
                  {isUploading ? 'Загрузка...' : title ? 'Сохранить изменения' : 'Сохранить'}
                </button>
              </form>
            </section>
          )}

          {activeTab === 'list' && (
            <section>
              <h2 className={style.globalTitle}>Все статьи</h2>
              <div id="articles-list">
                <table className={style.articlesTable}>
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
          )}
        </main>
      </div>
      <ModalAdmin
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        text={modalText}
        onConfirm={onModalConfirm}
        onCancel={onModalCancel}
      />
    </>
  )
}
