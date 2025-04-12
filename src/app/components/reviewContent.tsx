import style from 'app/styles/review.module.css'

type ReviewContentProps = {
  title: string
  text: string
  dataend: string
  price: string
  name: string
  city: string
}

export function ReviewContent({ title, text, dataend, price, name, city }: ReviewContentProps) {
  return (
    <div className={style.reviewContent}>
      <div className={style.textGroup}>
        <h4 className={style.title}>{title}</h4>
        <p className={style.text}>{text}</p>
      </div>
      <div className={style.lineGroup}>
        <div className={style.line}>
          <p className={style.dateText}>Дата завершения дела:</p>
          <p className={style.date}>{dataend}</p>
        </div>
        <div className={style.line}>
          <p className={style.dateText}>Списанная сумма:</p>
          <p className={style.sum}>{price} ₽</p>
        </div>
        <p className={style.name}>{`${name}, ${city}`}</p>
      </div>
    </div>
  )
}
