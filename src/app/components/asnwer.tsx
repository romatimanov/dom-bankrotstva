'use client'

import style from 'app/styles/home.module.css'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ButtonBg } from 'app/ui/buttonBg'
import ModalSuccess from './modalSuccess'

type FormData = {
  name: string
  email: string
  message: string
}

export function Asnwer() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>()

  const [messageLength, setMessageLength] = useState(0)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)

  const onSubmit = async (data: FormData) => {
    console.log(data)
    setIsOpenSuccessModal(true)
    reset()
    setMessageLength(0)
  }

  return (
    <section className={style.answer}>
      <div className="container">
        <div className="text-group">
          <h2 className="global-subtitle">
            ОСТАЛИСЬ ВОПРОСЫ? <br /> МЫ ОТВЕТИМ!
          </h2>
          <p className={style.text}>Не так страшен закон, как его толкуют. </p>
        </div>
        <div className={style.formGroup}>
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
              <div className={style.textareaGroup}>
                <p className={`${style.labelText} ${errors.message ? style.labelError : ''}`}>
                  Ваш вопрос
                </p>
                <div className={style.counter}>{messageLength} / 300</div>
              </div>
              <textarea
                placeholder="Расскажите о своей проблеме"
                maxLength={300}
                className={`${style.input} ${style.textarea} ${
                  errors.message ? style.errorInput : ''
                }`}
                {...register('message', {
                  required: true,
                  maxLength: { value: 300, message: 'Максимум 300 символов' }
                })}
                onChange={(e) => setMessageLength(e.target.value.length)}
              />
            </label>

            <ButtonBg type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </ButtonBg>

            <p className={style.consent}>
              Нажимая на кнопку, Вы даете свое согласие на обработку{' '}
              <a href="#">персональных данных</a>.
            </p>
          </form>
          <div className={style.img}>
            <img src="/answer.png" alt="answer" />
          </div>
        </div>
      </div>
      <ModalSuccess isOpen={isOpenSuccessModal} onClose={() => setIsOpenSuccessModal(false)} />
    </section>
  )
}
