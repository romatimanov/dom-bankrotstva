'use client'

import { renderPagination } from '../pagination'
import style from 'app/styles/admin.module.css'
import { useState } from 'react'
import { useDeleteTeamMutation, useGetTeamQuery } from 'app/api/teamApi'

type ReviewProps = {
  setText: (v: string) => void
  setPosition: (v: string) => void
  setName: (v: string) => void
  setImage: (v: string) => void
  setActiveTab: (
    v: 'create' | 'list' | 'createReview' | 'reviews' | 'contacts' | 'createTeam' | 'team'
  ) => void
  showModal: (text: string, onConfirm: () => void, onCancel?: () => void) => void
  setTeamId: (v: number | null) => void
}

export function Team({
  setImage,
  setText,
  setPosition,
  setName,
  setActiveTab,
  showModal,
  setTeamId
}: ReviewProps) {
  const { data: reviews = [], refetch: refetchTeam } = useGetTeamQuery()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const perPage = 15
  const totalPages = Math.ceil(reviews.length / perPage)
  const paginatedArticles = reviews.slice((currentPage - 1) * perPage, currentPage * perPage)
  const [deleteTeam] = useDeleteTeamMutation()

  const handleDelete = (id: number) => {
    showModal('Вы уверены, что хотите удалить сотрудника?', async () => {
      try {
        const res = await deleteTeam(id).unwrap()
        if (res.success || res.message) {
          refetchTeam()
        } else {
          showModal('Ошибка при удалении сотрудника', () => {})
        }
      } catch (err: any) {
        showModal('Ошибка при удалении: ' + (err?.data?.error || 'Неизвестная'), () => {})
        console.error(err)
      }
    })
  }
  const handleEdit = (team: any) => {
    setPosition(team.position)
    setText(team.text)
    setImage(team.image)
    setName(team.name)
    setTeamId(team.id)
    setActiveTab('createTeam')
  }

  return (
    <section>
      <h2 className={style.globalTitle}>Все сотрудники</h2>
      <div id="articles-list">
        <table className={`${style.articlesTable} ${style.responsiveTable}`}>
          <thead className={style.thead}>
            <tr className={style.row}>
              <th className={style.column}>Имя</th>
              <th className={style.column}>Должность</th>
              <th className={style.column}>Описание</th>
              <th className={style.column}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {paginatedArticles.map((team) => (
              <tr key={team.id}>
                <td>{team.name}</td>
                <td>{team.position}</td>
                <td className={style.textTeam}>{team.text}</td>
                <td className={style.actions}>
                  <button onClick={() => handleEdit(team)}>
                    <img src="/icon/edit.svg" alt="edit" />
                  </button>
                  <button onClick={() => handleDelete(team.id)}>
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
