import style from 'app/styles/ui/teamCard.module.css'
type TeamCardProps = {
  img: string
  name: string
  position: string
  text: string
}
export function TeamCard({ img, name, position, text }: TeamCardProps) {
  return (
    <div className={style.teamCard}>
      <div className={style.avatar}>
        <img src={img} alt="avatar" />
      </div>
      <div className={style.info}>
        <h3 className={style.name}>{name}</h3>
        <p className={style.position}>{position}</p>
        <p className={style.text}>{text}</p>
      </div>
    </div>
  )
}
