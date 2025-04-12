import {
  useCreateArticleMutation,
  useDeleteImageMutation,
  useGetArticlesQuery,
  useUpdateArticleMutation
} from 'app/api/articlesApi'
import style from 'app/styles/admin.module.css'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Posts } from './posts'

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

type CreatePostProps = {
  articleId?: number
  placeholder: string
  setActiveTab: (
    v: 'create' | 'list' | 'createReview' | 'reviews' | 'contacts' | 'createTeam' | 'team'
  ) => void
  setArticleId: (v: number | null) => void
  activeTab: 'create' | 'list' | 'createReview' | 'reviews' | 'contacts' | 'createTeam' | 'team'
  showModal: (text: string, onConfirm: () => void, onCancel?: () => void) => void
}

export function CreatePost({
  articleId,
  placeholder,
  setActiveTab,
  setArticleId,
  activeTab,
  showModal
}: CreatePostProps) {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [metakey, setKeys] = useState('')
  const [metadescription, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const editor = useRef(null)
  const [deleteImage] = useDeleteImageMutation()
  const editorRef = useRef<any>(null)
  const { refetch: refetchArticles } = useGetArticlesQuery()
  const [createArticle] = useCreateArticleMutation()
  const [updateArticle] = useUpdateArticleMutation()
  const [isUploading, setIsUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !content || !tags) {
      alert('Заполните заголовок, текст и теги')
      return
    }

    if (isUploading) {
      alert('Пожалуйста, дождитесь загрузки изображения')
      return
    }

    try {
      if (articleId !== null && articleId !== undefined) {
        const res = await updateArticle({
          id: articleId,
          data: {
            title,
            content,
            tags,
            metakey,
            metadescription,
            image_url: imageUrl
          }
        }).unwrap()

        if (!res.success) {
          return
        }
      } else {
        const res = await createArticle({
          title,
          content,
          tags,
          metakey,
          metadescription,
          image_url: imageUrl
        }).unwrap()

        if (!res.success) {
          alert('Ошибка создания статьи: ' + res.error)
          return
        }
      }

      refetchArticles()
      resetForm()
      setActiveTab('list')
    } catch (err: any) {
      alert('Ошибка при сохранении: ')
      console.error(err)
    }
  }

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Начните ввод...',
      toolbarSticky: false,
      language: 'ru',
      disablePlugins: ['image']
    }),

    [placeholder]
  )

  const resetForm = () => {
    setTitle('')
    setTags('')
    setKeys('')
    setDescription('')
    setContent('')
    setImageUrl('')
    setArticleId(null)
    if (editorRef.current) {
      editorRef.current.value = ''
    }
  }

  useEffect(() => {
    if (!articleId && activeTab === 'create') {
      resetForm()
    }
  }, [articleId, activeTab])

  return (
    <section>
      {activeTab === 'create' && (
        <div>
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

            {imageUrl && (
              <div style={{ marginTop: '10px' }}>
                <p>Текущее изображение:</p>
                <img src={imageUrl} alt="preview" style={{ maxWidth: '300px', display: 'block' }} />
                <button
                  type="button"
                  className={style.button}
                  onClick={async () => {
                    try {
                      await deleteImage(imageUrl).unwrap()
                      setImageUrl('')

                      if (articleId) {
                        await updateArticle({
                          id: articleId,
                          data: { image_url: '' }
                        }).unwrap()
                        await refetchArticles()
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

            {!imageUrl && (
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
                      setImageUrl(data.url)
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
              {isUploading ? 'Загрузка...' : articleId ? 'Сохранить изменения' : 'Сохранить'}
            </button>
          </form>
        </div>
      )}
      {activeTab === 'list' && (
        <Posts
          setTitle={setTitle}
          setTags={setTags}
          setKeys={setKeys}
          setDescription={setDescription}
          setContent={setContent}
          setImageUrl={setImageUrl}
          setArticleId={setArticleId}
          setActiveTab={setActiveTab}
          showModal={showModal}
        />
      )}
    </section>
  )
}
