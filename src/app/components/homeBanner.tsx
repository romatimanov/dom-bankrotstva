import style from 'app/styles/homeBanner.module.css'
import { ButtonBg } from 'app/ui/buttonBg'

type HomeBannerProps = {
  img?: string
  title: string
  text: string
  btn: string
  onClick?: () => void
}

export function HomeBanner({
  img = '/banner-default.png',
  title,
  text,
  btn,
  onClick
}: HomeBannerProps) {
  return (
    <div className={style.homeBanner}>
      <img className={style.image} src={img} alt="image" loading="lazy" />
      <div className={style.homeBannerContent}>
        <h2 className={style.title}>{title}</h2>
        <p className={style.text}>{text}</p>
        <ButtonBg styles={style.button} onClick={onClick}>
          {btn}
        </ButtonBg>
      </div>
    </div>
  )
}
