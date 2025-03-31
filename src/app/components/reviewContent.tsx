import style from 'app/styles/review.module.css'

type ReviewContentProps = {
  title: string
  text: string
  date: string
  sum: string
  name: string
}

export function ReviewContent({ title, text, date, sum, name }: ReviewContentProps) {
  return (
    <div className={style.reviewContent}>
      <div className={style.textGroup}>
        <h4 className={style.title}>{title}</h4>
        <p className={style.text}>{text}</p>
      </div>
      <div className={style.lineGroup}>
        <div className={style.line}>
          <p className={style.dateText}>Дата завершения дела:</p>
          <p className={style.date}>{date}</p>
        </div>
        <div className={style.line}>
          <p className={style.dateText}>Списанная сумма:</p>
          <p className={style.sum}>{sum}</p>
        </div>
        <p className={style.name}>{name}</p>
      </div>
    </div>
  )
}
