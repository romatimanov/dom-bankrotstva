'use client'

import style from 'app/styles/about.module.css'
import { Banner } from '../banner'
import { HomeBanner } from '../homeBanner'
import { useResize } from 'app/hook/useResize'
import { ModalProps } from 'app/type/modal'

export function Us({ setIsOpen }: ModalProps) {
  const resize = useResize(768)

  return (
    <section className={style.us}>
      <div className="container">
        <div className="text-group">
          <h2 className="global-subtitle">О КОМПАНИИ</h2>
          <p className="global-text">
            Наша компания предлагает широкий ассортимент юридических услуг, включая
          </p>
        </div>
        <div className={style.usGroup}>
          <div className={style.usItem}>
            <h3 className={style.usTitle}>Кто мы такие?</h3>
            <p className={style.usText}>
              <span className={style.usTextSpan}>
                Мы — команда юристов, которые превращают сложные правовые вопросы в простые и
                понятные решения.
              </span>
              Нашей главной задачей всегда было не просто разбираться в законах, а помогать людям
              выходить из сложных финансовых ситуаций с наименьшими потерями.
            </p>
          </div>
          <div className={style.usItem}>
            <h3 className={style.usTitle}>Наша история</h3>
            <p className={style.usText}>
              Началось всё несколько лет назад, когда мы поняли: слишком много людей тонут в долгах,
              юридических спорах и бесконечных разбирательствах, не зная, куда обратиться за
              помощью. Так родилась идея создать компанию, где каждый клиент будет чувствовать себя
              уверенно, зная, что его проблемой занимаются профессионалы. Сегодня мы —{' '}
              <span className={style.usTextSpan}>
                одна из ведущих юридических компаний в сфере банкротства и защиты прав граждан
              </span>
              , а сотни наших клиентов уже начали новую жизнь без долгов.
            </p>
          </div>
          <div className={style.usItem}>
            <h3 className={style.usTitle}>Наши принципы</h3>
            <p className={style.usText}>
              Началось всё несколько лет назад, когда мы поняли: слишком много людей тонут в долгах,
              юридических спорах и бесконечных разбирательствах, не зная, куда обратиться за
              помощью. Так родилась идея создать компанию, где каждый клиент будет чувствовать себя
              уверенно, зная, что его проблемой занимаются профессионалы. Сегодня мы —{' '}
              <span className={style.usTextSpan}>
                одна из ведущих юридических компаний в сфере банкротства и защиты прав граждан
              </span>
              , а сотни наших клиентов уже начали новую жизнь без долгов.
            </p>
          </div>
        </div>
        <Banner />
      </div>
      <HomeBanner
        img="/banner.png"
        title="Начните жизнь с чистого листа!"
        text="Получите консультацию юриста и узнайте сроки и стоимость списания вашего долга уже сегодня"
        btn={resize ? 'консультация с экспертом' : '"Записаться на консультацию с экспертом"'}
        onClick={() => setIsOpen(true)}
      />
    </section>
  )
}
