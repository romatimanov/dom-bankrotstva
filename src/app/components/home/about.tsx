'use client'
import { useResize } from 'app/hook/useResize'
import style from 'app/styles/home.module.css'
import { ModalProps } from 'app/type/modal'
import { Button } from 'app/ui/button'
import { ButtonBg } from 'app/ui/buttonBg'
import { useEffect } from 'react'
export function About({ setIsOpen }: ModalProps) {
  const resize = useResize(768)

  useEffect(() => {
    document.title = 'Главная'
  }, [])

  if (resize === null) return null

  return (
    <section className={style.homeSection}>
      <div className={style.home}>
        <div className="container">
          <div className={style.content}>
            <h1 className="global-title">Банкротство физических лиц под ключ</h1>
            <h2 className="global-text--home">
              Списываем до 100% долгов, защищаем от коллекторов и остановим рост процентов.
            </h2>
            <div className={style.btnGroup}>
              <ButtonBg onClick={() => setIsOpen(true)}>Избавиться от долгов сейчас</ButtonBg>
              <Button styles={style.button} onClick={() => setIsOpen(true)}>
                {!resize
                  ? 'Проверить, подхожу ли я под банкротство'
                  : 'Подхожу ли я под банкротство'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={style.banner}>
        <div className={`${style.bannerContent} container`}>
          <h2 className={style.bannerTitle}>О НАС ГОВОРЯТ:</h2>
          <div className={style.bannerImg}>
            <img src="/forbes.webp" alt="forbes" />
          </div>
          <div className={style.bannerImg}>
            <img src="/kommersant.webp" alt="kommersant" />
          </div>
          <div className={style.bannerImg}>
            <img src="/Pravo.webp" alt="Pravo" />
          </div>
        </div>
      </div>
    </section>
  )
}
