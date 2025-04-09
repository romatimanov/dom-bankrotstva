'use client'

import style from 'app/styles/home.module.css'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ButtonBg } from 'app/ui/buttonBg'
import ModalSuccess from './modalSuccess'
import Select, { components } from 'react-select'
import { SingleValue } from 'react-select'
import dynamic from 'next/dynamic'

const NoSSRSelect = dynamic(() => import('react-select').then((mod) => mod.default), {
  ssr: false
}) as React.ComponentType<any>

type OptionType = { value: string; label: string }
type FormData = {
  name: string
  email: string
  message: string
  sum: string
  answer: string
}
const DropdownIndicator = (props: any) => {
  const { menuIsOpen } = props.selectProps
  return (
    <components.DropdownIndicator {...props}>
      <span
        style={{
          display: 'inline-block',
          transform: menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}
      >
        <img src="/select-arrow.png" alt="arrow" />
      </span>
    </components.DropdownIndicator>
  )
}

const options = [
  { value: '1', label: 'Да' },
  { value: '2', label: 'Нет' }
]

export function Asnwer() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>()

  const [messageLength, setMessageLength] = useState(0)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)

  const [selected, setSelected] = useState<SingleValue<OptionType>>(null)

  const onSubmit = async (data: FormData) => {
    const fullData = {
      ...data,
      answer: selected?.label || ''
    }

    console.log(fullData)
    setIsOpenSuccessModal(true)
    reset()
    setSelected(null)
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
              <p className={`${style.labelText} ${errors.name ? style.labelError : ''}`}>
                Сумма долга
              </p>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Введите числовое значение"
                className={`${style.input} ${errors.sum ? style.errorInput : ''}`}
                {...register('sum', {
                  required: true,
                  validate: (value) => /^\d+$/.test(value) || 'Введите только цифры'
                })}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement
                  input.value = input.value.replace(/\D/g, '')
                }}
              />
            </label>
            <label className={style.formLine}>
              <p className={`${style.labelText} ${errors.name ? style.labelError : ''}`}>
                Наличие ипотеки/автокредита
              </p>
              <NoSSRSelect
                options={options}
                value={selected}
                onChange={(option: SingleValue<OptionType>) => setSelected(option)}
                placeholder="Выберите значение из списка"
                components={{ DropdownIndicator }}
                styles={{
                  control: (base: any, state: any) => ({
                    ...base,
                    border: '1px solid #E1E0E0',
                    borderRadius: 1,
                    boxShadow: 'none',
                    padding: '1px 12px',
                    '&:hover': {
                      borderColor: '#E1E0E0'
                    }
                  }),
                  dropdownIndicator: (base: any) => ({
                    ...base,
                    padding: '0 8px'
                  }),
                  indicatorSeparator: () => ({ display: 'none' }),
                  option: (base: any, state: any) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#C53030' : 'white',
                    color: state.isFocused ? 'white' : 'black',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }),
                  menu: (base: any) => ({
                    ...base,
                    borderRadius: 1,
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    marginTop: '0',
                    border: '1px solid #E1E0E0'
                  })
                }}
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
            <img className={style.answerImg} src="/answer.webp" alt="answer" />
          </div>
        </div>
      </div>
      <ModalSuccess isOpen={isOpenSuccessModal} onClose={() => setIsOpenSuccessModal(false)} />
    </section>
  )
}
