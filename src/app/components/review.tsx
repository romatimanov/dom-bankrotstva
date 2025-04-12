'use client'

import style from 'app/styles/home.module.css'
import { ReviewContent } from './reviewContent'
import { useRef } from 'react'
import { SwiperComponent } from './swiper'
import { Button } from 'app/ui/button'
import { useResize } from 'app/hook/useResize'
import { useGetReviewsQuery } from 'app/api/reviewsApi'

type ReviewProps = {
  btn?: boolean
}

export function Review({ btn }: ReviewProps) {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const resize = useResize(798)
  const { data: reviews } = useGetReviewsQuery()

  return (
    <section className={style.review}>
      <div className="container">
        <div className="text-group">
          <h2 className="global-subtitle">ОТЗЫВЫ КЛИЕНТОВ</h2>
          <p className={style.text}>
            Лучшее доказательство нашей работы – истории тех, кому мы уже помогли
          </p>
        </div>
      </div>
      <div className="container">
        <div className={style.swiper}>
          {reviews && reviews?.length > 0 ? (
            <SwiperComponent
              data={reviews}
              prevRef={prevRef}
              nextRef={nextRef}
              children={(item) => <ReviewContent {...item} />}
            />
          ) : (
            <p className={style.textReview}>Отзывов пока нет</p>
          )}
        </div>
        <div className={btn && !resize ? 'btn-group' : ''}>
          {btn && !resize && <Button>Смотреть все отзывы</Button>}
          <div className={style.navButtons}>
            <button ref={prevRef} className="swiper-btn">
              <img src="/icon/arrow-right.svg" alt="arrow" />
            </button>
            <button ref={nextRef} className="swiper-btn">
              <img src="/icon/arrow-left.svg" alt="arrow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
