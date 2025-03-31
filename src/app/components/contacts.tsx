import style from 'app/styles/home.module.css'
import { Map } from './map'

export function Contacts() {
  return (
    <section className={style.contacts}>
      <div className="container">
        <div className={style.textGroup}>
          <h2 className="global-subtitle">НАШИ КОНТАКТЫ</h2>
          <p className={style.text}>
            Не откладывайте звонок – своевременный совет может спасти ситуацию.
          </p>
        </div>
        <div className={style.contactsGroup}>
          <div className={style.contact}>
            <p className={style.contactTitle}>Контактная информация:</p>
            <a href="tel:+78121234567" className={style.contactLink}>
              <img src="/icon/phone.svg" alt="phone" />
              8-800-700-03-99
            </a>
            <a href="mailto:alfavista.moscow@gmail.com" className={style.contactLink}>
              <img src="/icon/mail.svg" alt="mail" />
              alfavista.moscow@gmail.com
            </a>
            <p className={style.contactText}>
              <a href="https://www.u-rist.com" className={style.contactLink}>
                <img src="/icon/partner.svg" alt="mail" />
                Наши партнеры: <span className={style.contactLinkSpan}>u-rist.com</span>
              </a>
            </p>
            <a href="https://t.me/Alpha_Vista" className={style.contactLink}>
              <img src="/icon/tg.svg" alt="tg" />
              Telegram: @Alpha_Vistaa
            </a>
          </div>
          <div className={style.contact}>
            <p className={style.contactTitle}>Адрес:</p>
            <div className={style.contactGroup}>
              <p className={style.contactGroupTitle}>Филиал в Москве</p>
              <p className={style.contactGroupText}>
                ТЦ “Дежнев Плаза” <br /> 127081, город Москва, пр-д Дежнёва, д. 1, офис 32
              </p>
            </div>
            <div className={style.contactGroup}>
              <p className={style.contactGroupTitle}>Филиал в Дубае</p>
              <p className={style.contactGroupText}>
                ALPHAVISTA TRADING - FZCO <br />
                IFZA Business Park, Building A2, Dubai Silicon Oasis, Dubai, UAE – Local Toll Free:
                800-IFZA (4392) <br />
                License Number 40827 <br />
                Makani Number A1 - <span style={{ color: 'var(--red-500)' }}>3641379065</span>
              </p>
            </div>
          </div>
          <div className={style.contact}>
            <p className={style.contactTitle}>Юридический адрес:</p>
            <p className={style.contactGroupText}>ООО «АЛЬФА ВИСТА РУС»</p>
            <p>
              Город Москва, Пресненская наб., 12, Москва-Сити, Башня Федерации, Восточная Башня,
              этаж 12, офис К3
            </p>
          </div>
        </div>
        <Map />
      </div>
    </section>
  )
}
