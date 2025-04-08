import style from 'app/styles/footer.module.css'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className={style.footer} id="footer">
      <div className={style.container}>
        <div className={style.logo}>
          <img src="/footer-logo.webp" alt="logo" />
        </div>
        <div className={style.footerContent}>
          <div className={style.contacts}>
            <a className={style.phone} href="tel:+88007000399">
              8-800-700-03-99
            </a>
            <button className={style.button}>Заказать обратный звонок</button>
          </div>
          <div className={style.contacts}>
            <p className={style.footerTitle}>Электронная почта:</p>
            <a
              className={`${style.footerText} ${style.footerLink}`}
              href="mailto:alfavista.moscow@gmail.com"
            >
              alfavista.moscow@gmail.com
            </a>
          </div>
          <div className={style.contacts}>
            <p className={style.footerTitle}>Адрес:</p>
            <p className={style.footerText}>
              ТЦ Дежнев Плаза <br />
              127081, город Москва, пр-д Дежнёва, д. 1, офис 32
            </p>
          </div>
          <div className={style.contacts}>
            <p className={style.footerTitle}>Реквизиты:</p>
            <p className={style.footerText}>ООО «АЛЬФА ВИСТА РУС»</p>
          </div>
        </div>
        <div className={style.line}>
          <p className={style.copyright}>©Все права защищены. 2024</p>
          <div className={style.social}>
            <Link
              className={style.socialLink}
              href="https://t.me/Alpha_Vistaa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/tg.webp" alt="telegram" />
              для связи
            </Link>
            <Link
              className={style.socialLink}
              href="https://t.me/alpha_vista"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/tg.webp" alt="telegram" />
              канал
            </Link>
          </div>
          <a href="#" className={style.policy}>
            Политика обработки персональных данных
          </a>
        </div>
      </div>
    </footer>
  )
}
