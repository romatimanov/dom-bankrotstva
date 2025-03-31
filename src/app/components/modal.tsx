import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import style from 'app/styles/modal.module.css'
import { ButtonBg } from 'app/ui/buttonBg'
import { useForm } from 'react-hook-form'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

type FormData = {
  name: string
  email: string
  city: string
}

export default function Modal({ isOpen, onClose, onSuccess }: ModalProps) {
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>()

  const [submitted, setSubmitted] = useState(false)

  const onSubmit = async (data: FormData) => {
    console.log(data)
    setSubmitted(true)
    onSuccess()
    reset()
  }

  useEffect(() => {
    setMounted(true)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  if (!mounted || !isOpen) return null

  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) return null

  return ReactDOM.createPortal(
    <div className={style.overlay} onClick={handleOverlayClick}>
      <div className={style.modal} ref={modalRef}>
        <button className={style.close} onClick={onClose}>
          <img src="/close.png" alt="close" />
        </button>
        <div className={style.content}>
          <h2 className={style.title}>
            Укажите ваши данные для связи и получите консультацию юриста
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <label className={style.formLine}>
              <p className={`${style.labelText} ${errors.name ? style.labelError : ''}`}>
                Введите имя
              </p>
              <input
                type="text"
                placeholder="Имя"
                className={`${style.input} ${errors.name ? style.errorInput : ''}`}
                {...register('name', { required: true })}
              />
            </label>

            <label className={style.formLine}>
              <p className={`${style.labelText} ${errors.email ? style.labelError : ''}`}>
                Введите почту
              </p>
              <input
                type="email"
                placeholder="E-mail"
                className={`${style.input} ${errors.email ? style.errorInput : ''}`}
                {...register('email', {
                  required: true,
                  pattern: { value: /^\S+@\S+$/i, message: 'Неверный email' }
                })}
              />
            </label>

            <label className={style.formLine}>
              <p className={`${style.labelText} ${errors.city ? style.labelError : ''}`}>
                Из какого вы города
              </p>
              <input
                type="text"
                placeholder="Город"
                className={`${style.input} ${errors.city ? style.errorInput : ''}`}
                {...register('city', {
                  required: 'Введите ваш город',
                  minLength: {
                    value: 2,
                    message: 'Название города слишком короткое'
                  }
                })}
              />
              {errors.city && <p className={style.errorText}>{errors.city.message}</p>}
            </label>

            <ButtonBg type="submit" disabled={isSubmitting} styles={style.button}>
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </ButtonBg>

            {submitted && <p className={style.success}>Вопрос успешно отправлен!</p>}
          </form>
        </div>
        <span className={style.line}></span>
        <span className={style.line}></span>
        <span className={style.line}></span>
      </div>
    </div>,
    modalRoot
  )
}
