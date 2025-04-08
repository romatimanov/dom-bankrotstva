'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import styles from 'app/styles/login.module.css'
import { useState } from 'react'

type FormData = {
  username: string
  password: string
}

export default function AdminLogin() {
  const router = useRouter()
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      const result = await res.json()
      setError(result.message || 'Ошибка входа')
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label className={styles.formLine}>
            <p className={styles.labelText}>Введите имя</p>
            <input
              type="text"
              placeholder="Имя"
              className={styles.input}
              {...register('username', { required: 'Введите имя' })}
            />
            {errors.username && <p className={styles.error}>{errors.username.message}</p>}
          </label>

          <label className={styles.formLine}>
            <p className={styles.labelText}>Введите пароль</p>
            <input
              type="password"
              placeholder="Пароль"
              className={styles.input}
              {...register('password', { required: 'Введите пароль' })}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </label>

          <button type="submit" className={styles.button}>
            Войти
          </button>

          {error && <p className={styles.error}>{error}</p>}
        </form>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </div>
    </div>
  )
}
