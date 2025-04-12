'use client'

import { useGetContactsQuery } from 'app/api/contactsApi'
import style from 'app/styles/footer.module.css'
import Link from 'next/link'

export function Footer() {
  const { data: contacts = [] } = useGetContactsQuery()
  const firstContact = contacts[0]
  return (
    <footer className={style.footer} id="footer">
      <div className={style.container}>
        <div className={style.logo}>
          <img src="/footer-logo.webp" alt="logo" />
        </div>
        <div className={style.footerContent}>
          <div className={style.contacts}>
            <a className={style.phone} href={`tel:${firstContact?.phone}`}>
              {firstContact?.phone}
            </a>
            <button className={style.button}>Заказать обратный звонок</button>
          </div>
          <div className={style.contacts}>
            <p className={style.footerTitle}>Электронная почта:</p>
            <a
              className={`${style.footerText} ${style.footerLink}`}
              href={`mailto:${firstContact?.mail}`}
            >
              {firstContact?.mail}
            </a>
          </div>
          <div className={style.contacts}>
            <p className={style.footerTitle}>Адрес:</p>
            <p className={`${style.footerText} ${style.footerAddress}`}>{firstContact?.address}</p>
          </div>
          <div className={style.contacts}>
            <p className={style.footerTitle}>Реквизиты:</p>
            <p className={style.footerText}>{firstContact?.address_name}</p>
          </div>
        </div>
        <div className={style.line}>
          <p className={style.copyright}>©Все права защищены. 2024</p>
          <div className={style.social}>
            {firstContact?.tgCall && (
              <Link
                className={style.socialLink}
                href={firstContact.tgCall}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/tg.webp" alt="telegram" />
                для связи
              </Link>
            )}

            {firstContact?.tgChannel && (
              <Link
                className={style.socialLink}
                href={firstContact.tgChannel}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/tg.webp" alt="telegram" />
                канал
              </Link>
            )}
          </div>
          <a href="#" className={style.policy}>
            Политика обработки персональных данных
          </a>
        </div>
      </div>
    </footer>
  )
}
