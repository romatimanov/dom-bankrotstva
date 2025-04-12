import style from 'app/styles/home.module.css'
import { Map } from '../map'

type ContactsProps = {
  id: string
  contacts: any
}

export function Contacts({ id, contacts }: ContactsProps) {
  return (
    <section className={style.contacts} id={id}>
      <div className="container">
        <div className="text-group">
          <h2 className="global-subtitle">НАШИ КОНТАКТЫ</h2>
          <p className={style.text}>
            Не откладывайте звонок – своевременный совет может спасти ситуацию.
          </p>
        </div>
        <div className={style.contactsGroup}>
          <div className={style.contact}>
            <p className={style.contactTitle}>Контактная информация:</p>
            <a href={`tel:${contacts.phone}`} className={style.contactLink}>
              <img src="/icon/phone.svg" alt="phone" />
              {contacts.phone}
            </a>
            <a href={`mailto:${contacts.mail}`} className={style.contactLink}>
              <img src="/icon/mail.svg" alt="mail" />
              {contacts.mail}
            </a>
            <p className={style.contactText}>
              <a
                href={`https://www.${contacts.partners}`}
                className={style.contactLink}
                target="_blank"
              >
                <img src="/icon/partner.svg" alt="mail" />
                Наши партнеры: <span className={style.contactLinkSpan}>{contacts.partners}</span>
              </a>
            </p>
            <a href={contacts.tgCall} className={style.contactLink} target="_blank">
              <img src="/icon/tg.svg" alt="tg" />
              Telegram: @Alpha_Vistaa
            </a>
          </div>
          <div className={style.contact}>
            <p className={style.contactTitle}>Адрес:</p>
            {contacts.branch.map((branch: any, index: number) => (
              <div className={style.contactGroup} key={index}>
                <p className={style.contactGroupTitle}>{branch.name}</p>
                <p className={style.contactGroupText}>{branch.address}</p>
              </div>
            ))}
          </div>
          <div className={style.contact}>
            <p className={style.contactTitle}>Юридический адрес:</p>
            <p className={style.contactGroupText}>{contacts.address_name}</p>
            <p>{contacts.address}</p>
          </div>
        </div>
        <Map />
      </div>
    </section>
  )
}
