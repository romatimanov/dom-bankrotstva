'use client'

import style from 'app/styles/home.module.css'
import { ReviewContent } from './reviewContent'
import { useRef } from 'react'
import { SwiperComponent } from './swiper'
import { Button } from 'app/ui/button'
import { useResize } from 'app/hook/useResize'

export const reviews = [
  {
    title: 'Теперь сплю спокойно!',
    text: 'Юристы компании помогли мне списать долги, которые я уже считал пожизненным приговором. Всё прошло максимально прозрачно, и теперь я могу спокойно спать. Огромное спасибо за поддержку и грамотное сопровождение!',
    date: '15 января 2024',
    sum: '2 350 000 ₽',
    name: 'Олег В., Москва'
  },
  {
    title: 'Из долговой ямы – к новой жизни!',
    text: 'Обратилась с юридическим вопросом, и уже на первой консультации стало понятно, что мне действительно помогут. Всё чётко, без лишних обещаний, зато с реальным результатом. Спасибо, что помогли выбраться из долговой ямы!',
    date: '5 марта 2024',
    sum: '1 920 000 ₽',
    name: 'Марина Л., Казань'
  },
  {
    title: 'Прощайте кредиты, здравствуй свобода!',
    text: 'Долго сомневался, стоит ли обращаться за банкротством, но здесь мне всё разложили по полочкам. Процесс прошёл спокойно, без давления. Теперь у меня чистая кредитная история и новые возможности. Спасибо за профессионализм!',
    date: '10 декабря 2023',
    sum: '3 150 000 ₽',
    name: 'Анна К., Санкт-Петербург'
  },
  {
    title: 'Из долговой ямы – к новой жизни!',
    text: 'Обратилась с юридическим вопросом, и уже на первой консультации стало понятно, что мне действительно помогут. Всё чётко, без лишних обещаний, зато с реальным результатом. Спасибо, что помогли выбраться из долговой ямы!',
    date: '5 марта 2024',
    sum: '1 920 000 ₽',
    name: 'Марина Л., Казань'
  },
  {
    title: 'Прощайте кредиты, здравствуй свобода!',
    text: 'Долго сомневался, стоит ли обращаться за банкротством, но здесь мне всё разложили по полочкам. Процесс прошёл спокойно, без давления. Теперь у меня чистая кредитная история и новые возможности. Спасибо за профессионализм!',
    date: '10 декабря 2023',
    sum: '3 150 000 ₽',
    name: 'Анна К., Санкт-Петербург'
  }
]

type ReviewProps = {
  btn?: boolean
}

export function Review({ btn }: ReviewProps) {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const resize = useResize(798)

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
          <SwiperComponent
            data={reviews}
            prevRef={prevRef}
            nextRef={nextRef}
            children={(item) => <ReviewContent {...item} />}
          />
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
