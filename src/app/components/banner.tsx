import style from 'app/styles/banner.module.css'

export function Banner() {
  return (
    <div className={style.choiceBanner}>
      <div className={style.choiceBannerContent}>
        <span className={style.choiceBannerNum}>30+</span>
        <p className={style.choiceBannerText}>юристов в штате</p>
      </div>
      <div className={style.choiceBannerContent}>
        <span className={style.choiceBannerNum}>5000+</span>
        <p className={style.choiceBannerText}>
          клиентов, которые уже выбрались из финансовых трудностей
        </p>
      </div>
      <div className={style.choiceBannerContent}>
        <span className={style.choiceBannerNum}>20+</span>
        <p className={style.choiceBannerText}>лет успешной работы на рынке</p>
      </div>
      <div className={style.choiceBannerContent}>
        <span className={style.choiceBannerNum}>90%</span>
        <p className={style.choiceBannerText}>дел заканчиваются полным списанием долгов</p>
      </div>
    </div>
  )
}
