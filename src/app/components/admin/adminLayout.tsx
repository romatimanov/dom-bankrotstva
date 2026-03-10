'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import style from 'app/styles/admin.module.css'
import CreateReview from './createReview'
import { CreatePost } from './createPost'
import ModalAdmin from '../modalAdmin'
import ContactManager from './contactManager'
import CreateTeam from './createTeam'

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState<
    'create' | 'list' | 'createReview' | 'reviews' | 'contacts' | 'createTeam' | 'team'
  >('create')
  const [articleId, setArticleId] = useState<number | null>(null)
  const [reviewId, setReviewId] = useState<number | null>(null)
  const [teamId, setTeamId] = useState<number | null>(null)
  const [modalText, setModalText] = useState('')
  const router = useRouter()
  const [onModalConfirm, setOnModalConfirm] = useState<() => void>(() => () => {})
  const [onModalCancel, setOnModalCancel] = useState<() => void>(() => () => {})
  const [isOpen, setIsOpen] = useState(false)
  const [isMenu, setIsMenu] = useState(false)
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

  const handleMenu = () => {
    setIsMenu(!isMenu)
  }

  const handleTab = (
    tab: 'create' | 'list' | 'createReview' | 'reviews' | 'contacts' | 'team' | 'createTeam'
  ) => {
    setActiveTab(tab)
    setIsMenu(false)
  }

  return (
    <div className={style.adminLayout}>
      <button className={style.burger} onClick={handleMenu}>
        Меню
      </button>
      <aside className={`${style.sidebar} ${isMenu ? style.active : ''}`}>
        <ul className={style.sidebarMenu}>
          <li>
            <button
              className={style.sidebarButton}
              onClick={() => {
                setArticleId(null)
                handleTab('create')
              }}
            >
              Создать статью
            </button>
          </li>
          <li>
            <button
              className={style.sidebarButton}
              onClick={() => {
                setArticleId(null)
                handleTab('list')
              }}
            >
              Все статьи
            </button>
          </li>
          <li>
            <button
              className={style.sidebarButton}
              onClick={() => {
                setReviewId(null)
                handleTab('createReview')
              }}
            >
              Написать отзыв
            </button>
          </li>
          <li>
            <button
              className={style.sidebarButton}
              onClick={() => {
                setReviewId(null)
                handleTab('reviews')
              }}
            >
              Все отзывы
            </button>
          </li>
          <li>
            <button
              className={style.sidebarButton}
              onClick={() => {
                setTeamId(null)
                handleTab('createTeam')
              }}
            >
              Добавить сотрудника
            </button>
          </li>
          <li>
            <button
              className={style.sidebarButton}
              onClick={() => {
                setTeamId(null)
                handleTab('team')
              }}
            >
              Все сотрудники
            </button>
          </li>
          <li>
            <button
              className={style.sidebarButton}
              onClick={() => {
                handleTab('contacts')
              }}
            >
              Контакты
            </button>
          </li>
          <li>
            <button
              className={style.sidebarButton}
              onClick={async () => {
                await fetch('/api/admin/logout', { method: 'POST' })
                router.push('/')
              }}
            >
              Выйти
            </button>
          </li>
        </ul>
      </aside>

      <main className={style.mainContent}>
        {['create', 'list'].includes(activeTab) && (
          <CreatePost
            articleId={articleId || undefined}
            placeholder="Введите текст статьи"
            setActiveTab={setActiveTab}
            setArticleId={setArticleId}
            activeTab={activeTab}
            showModal={showModal}
          />
        )}

        {['createReview', 'reviews'].includes(activeTab) && (
          <CreateReview
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            showModal={showModal}
            reviewId={reviewId}
            setReviewId={setReviewId}
          />
        )}
        {['contacts'].includes(activeTab) && <ContactManager />}

        {['createTeam', 'team'].includes(activeTab) && (
          <CreateTeam
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            showModal={showModal}
            teamId={teamId}
            setTeamId={setTeamId}
          />
        )}
      </main>
      <ModalAdmin
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        text={modalText}
        onConfirm={onModalConfirm}
        onCancel={onModalCancel}
      />
    </div>
  )
}
