'use client'

import { useResize } from 'app/hook/useResize'
import style from 'app/styles/home.module.css'
import { ModalProps } from 'app/type/modal'
import { ButtonBg } from 'app/ui/buttonBg'

export function Steps({ setIsOpen }: ModalProps) {
  const resize = useResize(768)
  return (
    <section className={`${style.steps} `}>
      <div className="container">
        <div className="text-group">
          <h2 className="global-subtitle">ЭТАПЫ НАШЕЙ РАБОТЫ</h2>
          <p className={style.text}>
            Там, где закон – там и порядок. Мы поможем вам встать на верный путь.
          </p>
        </div>
        <div className={style.stepsGroup}>
          <div className={style.step}>
            <div className={`${style.stepContent} ${style.alignRight}`}>
              <div className={style.stepMobile}>
                <div className={style.stepNumMobile}>01</div>
                <h3 className={style.stepTitle}>Онлайн-заявка</h3>
              </div>
              <p className={style.stepText}>
                Заполняете заявку на получение бесплатной консультации и мы перезвоним Вам в
                ближайшее время.
              </p>
            </div>
            <div className={style.stepNumberGroup}>
              <div className={style.stepNum}>01</div>
              <img className={style.stepArrow} src="/arrow.png" alt="arrow" />
            </div>
            <div className={style.empty}></div>
          </div>
          <div className={style.step}>
            <div className={style.empty}></div>
            <div className={style.stepNumberGroup}>
              <div className={style.stepNum}>02</div>
              <img className={style.stepArrow} src="/arrow.png" alt="arrow" />
            </div>
            <div className={`${style.stepContent} ${style.alignLeft}`}>
              <div className={style.stepMobile}>
                <div className={style.stepNumMobile}>02</div>
                <h3 className={style.stepTitle}>Подбор стратегии</h3>
              </div>
              <p className={style.stepText}>
                Собираем необходимые документы и подаём заявление на списание задолженности в
                Арбитражный суд.
              </p>
            </div>
          </div>
          <div className={style.step}>
            <div className={`${style.stepContent} ${style.alignRight}`}>
              <div className={style.stepMobile}>
                <div className={style.stepNumMobile}>03</div>
                <h3 className={style.stepTitle}> Судебное решение</h3>
              </div>
              <p className={style.stepText}>
                Личная встреча с юристом или онлайн-консультация с одним из наших специалистов
              </p>
            </div>
            <div className={style.stepNumberGroup}>
              <div className={style.stepNum}>03</div>
              <img className={style.stepArrow} src="/arrow.png" alt="arrow" />
            </div>
            <div className={style.empty}></div>
          </div>
          <div className={style.step}>
            <div className={style.empty}></div>
            <div className={style.stepNumberGroup}>
              <div className={style.stepNum}>04</div>
            </div>
            <div className={`${style.stepContent} ${style.alignLeft}`}>
              <div className={style.stepMobile}>
                <div className={style.stepNumMobile}>04</div>
                <h3 className={style.stepTitle}>Свобода</h3>
              </div>
              <p className={style.stepText}>Спокойная жизнь без долгов и звонков коллекторов!</p>
            </div>
          </div>
        </div>
        <ButtonBg styles={style.stepButton} onClick={() => setIsOpen(true)}>
          {!resize ? 'Узнать, подходит ли вам банкротство' : 'Подходит ли вам банкротство'}
        </ButtonBg>
      </div>
    </section>
  )
}
