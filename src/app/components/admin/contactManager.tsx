'use client'

import { useState } from 'react'
import style from 'app/styles/admin.module.css'
import { useGetContactsQuery, useUpdateContactsMutation } from 'app/api/contactsApi'

type BranchItem = {
  name: string
  address: string
}

export default function ContactManager() {
  const { data: contacts = [], refetch } = useGetContactsQuery()
  const [updateContact] = useUpdateContactsMutation()
  const [activeId, setActiveId] = useState<number | null>(null)
  const [phone, setPhone] = useState('')
  const [mail, setMail] = useState('')
  const [partners, setPartners] = useState('')
  const [tgChannel, setTgChannel] = useState('')
  const [tgCall, setTgCall] = useState('')
  const [address_name, setAddress_name] = useState('')
  const [address, setAddress] = useState('')
  const [branch, setBranch] = useState<BranchItem[]>([{ name: '', address: '' }])

  const handleEdit = (item: any) => {
    setActiveId(item.id)
    setPhone(item.phone)
    setMail(item.mail)
    setPartners(item.partners)
    setTgChannel(item.tgChannel)
    setTgCall(item.tgCall)
    setAddress_name(item.address_name)
    setAddress(item.address)
    setBranch(item.branch?.length ? item.branch : [{ name: '', address: '' }])
  }

  const handleBranchChange = (index: number, field: 'name' | 'address', value: string) => {
    const updated = [...branch]
    updated[index][field] = value
    setBranch(updated)
  }

  const addBranch = () => {
    if (branch.length < 5) {
      setBranch([...branch, { name: '', address: '' }])
    }
  }

  const removeBranch = (index: number) => {
    if (branch.length > 1) {
      const updated = [...branch]
      updated.splice(index, 1)
      setBranch(updated)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (activeId === null) {
      alert('Контакт не выбран')
      return
    }

    const required = [
      { label: 'Телефон', value: phone },
      { label: 'Почта', value: mail },
      { label: 'Партнеры', value: partners },
      { label: 'Телеграм канал', value: tgChannel },
      { label: 'Телеграм для связи', value: tgCall },
      { label: 'Юр. адрес (название)', value: address_name },
      { label: 'Юр. адрес (адрес)', value: address }
    ]

    const empty = required.find((f) => f.value.trim() === '')
    if (empty) {
      alert(`Поле "${empty.label}" не должно быть пустым`)
      return
    }

    if (!branch.length) {
      alert('Должен быть хотя бы один филиал')
      return
    }

    try {
      const res = await updateContact({
        id: activeId,
        data: {
          phone,
          mail,
          partners,
          tgChannel,
          tgCall,
          address_name,
          address,
          branch
        }
      }).unwrap()

      if (!res.success) {
        alert('Ошибка: ' + res.error)
        return
      }

      alert('Контакт обновлён')
      setActiveId(null)
      refetch()
    } catch (err) {
      alert('Ошибка при сохранении')
      console.error(err)
    }
  }

  return (
    <section>
      <h2 className={style.globalTitle}>Контакты</h2>
      <div>
        <table className={`${style.articlesTable} ${style.responsiveTable}`}>
          <thead className={style.thead}>
            <tr className={style.row}>
              <th className={style.column}>Телефон</th>
              <th className={style.column}>Почта</th>
              <th className={style.column}>Партнеры</th>
              <th className={style.column}>Тг канал</th>
              <th className={style.column}>Тг для связи</th>
              <th className={style.column}>Юр. адрес (название)</th>
              <th className={style.column}>Юр. адрес (адрес)</th>
              <th className={style.column}>Филиалы</th>
              <th className={style.column}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((item) => (
              <tr key={item.id}>
                <td className={style.contactTd} data-label="Телефон">
                  {item.phone}
                </td>
                <td className={style.contactTd} data-label="Почта">
                  {item.mail}
                </td>
                <td className={style.contactTd} data-label="Партнеры">
                  {item.partners}
                </td>
                <td className={style.contactTd} data-label="Тг канал">
                  {item.tgChannel}
                </td>
                <td className={style.contactTd} data-label="Тг для связи">
                  {item.tgCall}
                </td>
                <td className={style.contactTd} data-label="Юр. адрес (название)">
                  {item.address_name}
                </td>
                <td className={style.contactTd} data-label="Юр. адрес (адрес)">
                  {item.address}
                </td>
                <td className={style.contactTd} data-label="Филиалы">
                  {item.branch?.length
                    ? `${item.branch[0].name} — ${item.branch[0].address}`
                    : 'Нет филиалов'}
                </td>
                <td className={style.contactTd} data-label="Действия">
                  <button onClick={() => handleEdit(item)}>
                    <img src="/icon/edit.svg" alt="edit" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeId && (
        <form onSubmit={handleSubmit} className={style.form}>
          <h3 className={style.globalTitle}>Редактировать контакт</h3>

          <input
            className={style.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Телефон"
          />
          <input
            className={style.input}
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Почта"
          />
          <input
            className={style.input}
            value={partners}
            onChange={(e) => setPartners(e.target.value)}
            placeholder="Партнеры"
          />
          <input
            className={style.input}
            value={tgChannel}
            onChange={(e) => setTgChannel(e.target.value)}
            placeholder="Телеграм канал"
          />
          <input
            className={style.input}
            value={tgCall}
            onChange={(e) => setTgCall(e.target.value)}
            placeholder="Телеграм для связи"
          />
          <input
            className={style.input}
            value={address_name}
            onChange={(e) => setAddress_name(e.target.value)}
            placeholder="Юр. адрес (название)"
          />
          <input
            className={style.input}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Юр. адрес (адрес)"
          />

          <div>
            <h4>Филиалы:</h4>
            {branch.map((b, i) => (
              <div key={i} className={style.branch}>
                <input
                  className={style.input}
                  placeholder="Название филиала"
                  value={b.name}
                  onChange={(e) => handleBranchChange(i, 'name', e.target.value)}
                />
                <input
                  className={style.input}
                  placeholder="Адрес филиала"
                  value={b.address}
                  onChange={(e) => handleBranchChange(i, 'address', e.target.value)}
                />
                {branch.length > 1 && (
                  <button
                    type="button"
                    className={style.buttonDelete}
                    onClick={() => removeBranch(i)}
                  >
                    Удалить
                  </button>
                )}
              </div>
            ))}
            {branch.length < 5 && (
              <button type="button" className={style.buttonAdd} onClick={addBranch}>
                Добавить филиал
              </button>
            )}
          </div>

          <button type="submit" className={style.button}>
            Сохранить изменения
          </button>
        </form>
      )}
    </section>
  )
}
