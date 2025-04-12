'use client'

import style from 'app/styles/about.module.css'
import { SwiperComponent } from '../swiper'
import { TeamCard } from 'app/ui/teamCard'
import { useRef } from 'react'
import { useGetTeamQuery } from 'app/api/teamApi'

export function Team() {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const { data = [] } = useGetTeamQuery()

  return (
    <section className={style.team}>
      <div className="container">
        <div className="text-group">
          <h2 className="global-subtitle">НАШ КОЛЛЕКТИВ</h2>
          <p className="global-text">
            Банкротство – это не конец, а возможность начать с чистого листа.
          </p>
        </div>
        <div className={style.swiper}>
          <div className={style.swiperWrapper}>
            <SwiperComponent
              data={data ?? []}
              prevRef={prevRef}
              nextRef={nextRef}
              children={(item) => <TeamCard {...item} />}
            />
          </div>
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
