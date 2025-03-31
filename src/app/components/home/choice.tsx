import style from 'app/styles/home.module.css'
import { ModalProps } from 'app/type/modal'
import { ButtonBg } from 'app/ui/buttonBg'
import { Banner } from '../banner'

export function Choice({ setIsOpen }: ModalProps) {
  return (
    <section className={style.choice}>
      <div className="container">
        <div className="text-group">
          <h2 className="global-subtitle">ПОЧЕМУ ВЫБИРАЮТ НАС</h2>
          <p className={style.text}>
            В сложных делах важно не только знать закон, но и уметь его применять
          </p>
        </div>
        <div className={style.choiceGroup}>
          <div className={style.choiceItem}>
            <div className={style.choiceNumGroup}>
              <p className={style.choiceNum}>01</p>
              <h3 className={style.choiceTitle}>Свобода</h3>
            </div>
            <p className={style.choiceText}>
              С момента признания гражданина банкротом судебные приставы приостанавливают
              исполнительные производства, взыскания, снимают все наложенные ограничения и аресты.
            </p>
          </div>
          <div className={style.choiceItem}>
            <div className={style.choiceNumGroup}>
              <p className={style.choiceNum}>02</p>
              <h3 className={style.choiceTitle}>Неприкосновенность жилья</h3>
            </div>
            <p className={style.choiceText}>
              Взыскание не может быть обращено на жилое помещение, если для гражданина-должника и
              членов его семьи, совместно проживающих в принадлежащем помещении, оно является
              единственным пригодным для постоянного проживания.
            </p>
          </div>
          <div className={style.choiceItem}>
            <div className={style.choiceNumGroup}>
              <p className={style.choiceNum}>03</p>
              <h3 className={style.choiceTitle}>Спокойствие</h3>
            </div>
            <p className={style.choiceText}>
              Не допускается непосредственное взаимодействие с должником коллекторскими агентствами
              и службами взыскания со дня признания гражданина банкротом.
            </p>
          </div>
          <div className={style.choiceItem}>
            <div className={style.choiceNumGroup}>
              <p className={style.choiceNum}>04</p>
              <h3 className={style.choiceTitle}>Списание долгов</h3>
            </div>
            <p className={style.choiceText}>
              После завершения процедуры банкротства гражданин освобождается от дальнейшего
              исполнения требований кредиторов.
            </p>
          </div>
        </div>
        <Banner />
      </div>
      <div className={style.choiceInfo}>
        <div className="container">
          <div className={style.choiceInfoContent}>
            <h3 className={style.choiceInfoTitle}>СПИШИТЕ ДОЛГИ САМОСТОЯТЕЛЬНО БЕЗ СУДА!</h3>
            <p className={style.choiceInfoText}>
              С 1 сентября 2020 года стало списать долги можно без суда через отделение МФЦ.
              Узнайте, подходит ли вам такая процедура?
            </p>
            <ButtonBg styles={style.choiceInfoBtn} onClick={() => setIsOpen(true)}>
              Записаться на разбор ситуации
            </ButtonBg>
          </div>
        </div>
        <span className={style.choiceInfoLine}></span>
        <span className={style.choiceInfoLine}></span>
        <span className={style.choiceInfoLine}></span>
      </div>
    </section>
  )
}
