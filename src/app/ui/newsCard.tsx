'use client'

import style from 'app/styles/ui/newsCard.module.css'
import { formatTitleToUrl } from 'app/utils/formatUrl'
import { useRouter } from 'next/navigation'

type NewsCardProps = {
  id: number
  slug: string
  img?: string
  title: string
  text: string
  tags: string
  date: string
  likes: number
  views: number
}

export function NewsCard({ id, img, title, text, tags, date, likes, views }: NewsCardProps) {
  const router = useRouter()

  const handleClick = () => {
    const formatted = formatTitleToUrl(title)
    router.push(`/article?title=${formatted}`)
  }
  return (
    <div onClick={handleClick} className={style.newsCard}>
      <span className={style.tags}>{tags}</span>
      <h2 className={style.title}>{title}</h2>
      <img className={style.image} src={img} alt="picture" />
      <p>{text}</p>
      <div className={style.dateGroup}>
        <p className={style.date}>{date}</p>
        <div className={style.viewsGroup}>
          <div className={style.icon}>
            <img src="/icon/view.svg" alt="view" />
            {views}
          </div>
          <div className={style.icon}>
            <img src="/icon/like.svg" alt="like" />
            {likes}
          </div>
        </div>
      </div>
    </div>
  )
}
