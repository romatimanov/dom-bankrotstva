'use client'

import { useAddLikeMutation } from 'app/api/articlesApi'
import style from 'app/styles/ui/newsCard.module.css'
import { formatTitleToUrl } from 'app/utils/formatUrl'
import { useRouter } from 'next/navigation'

type NewsCardProps = {
  id: number
  slug: string
  img?: string
  title: string
  tags: string
  date: string
  likes: number
  views: number
}

export function NewsCard({ id, img, title, tags, date, likes, views }: NewsCardProps) {
  const router = useRouter()
  const [addLike] = useAddLikeMutation()

  const handleClick = () => {
    const formatted = formatTitleToUrl(title)
    router.push(`/article?title=${formatted}`)
  }

  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    const alreadyLiked = localStorage.getItem(`liked-${id}`)
    if (alreadyLiked) return

    try {
      await addLike(id.toString())
      console.log('like added')

      localStorage.setItem(`liked-${id}`, 'true')
    } catch (err) {
      console.error('Ошибка при лайке', err)
    }
  }

  return (
    <div onClick={handleClick} className={style.newsCard}>
      <div className={style.textGroup}>
        <span className={style.tags}>{tags}</span>
        <h2 className={style.title}>{title}</h2>
      </div>
      <div className={style.textGroup}>
        <img className={style.image} src={img} alt="picture" />
        <div className={style.dateGroup}>
          <p className={style.date}>{date}</p>
          <div className={style.viewsGroup}>
            <div className={style.icon}>
              <img src="/icon/view.svg" alt="view" />
              {views}
            </div>
            <button className={`${style.icon} ${style.like}`} onClick={handleLikeClick}>
              <svg
                width="15"
                height="13"
                viewBox="0 0 15 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.5 2.25009C6.22541 0.764698 4.09559 0.305643 2.49862 1.66581C0.901648 3.02598 0.676817 5.30012 1.93093 6.9088C2.97363 8.24631 6.12923 11.0672 7.16346 11.9802C7.27917 12.0824 7.33703 12.1335 7.40451 12.1535C7.46341 12.171 7.52786 12.171 7.58676 12.1535C7.65424 12.1335 7.7121 12.0824 7.8278 11.9802C8.86204 11.0672 12.0176 8.24631 13.0603 6.9088C14.3145 5.30012 14.1171 3.01168 12.4926 1.66581C10.8682 0.319951 8.77459 0.764698 7.5 2.25009Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {likes}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
