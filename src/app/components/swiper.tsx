'use client'

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { NavigationOptions } from 'swiper/types'
import { useState } from 'react'
import { MutableRefObject } from 'react'

type SwiperComponentProps = {
  data: any[]
  children: (item: any, index: number) => React.ReactNode
  prevRef: MutableRefObject<HTMLDivElement | null>
  nextRef: MutableRefObject<HTMLDivElement | null>
}

export function SwiperComponent({ data, children, prevRef, nextRef }: SwiperComponentProps) {
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={32}
      slidesPerView={3}
      breakpoints={{
        0: { slidesPerView: 1 },
        650: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }}
      onInit={(swiper: SwiperClass) => {
        setTimeout(() => {
          if (
            swiper &&
            swiper.params &&
            'navigation' in swiper.params &&
            prevRef.current &&
            nextRef.current
          ) {
            const nav = swiper.params.navigation as NavigationOptions
            nav.prevEl = prevRef.current
            nav.nextEl = nextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }

          setIsBeginning(swiper.isBeginning)
          setIsEnd(swiper.isEnd)
        }, 0)
      }}
      onSlideChange={(swiper) => {
        setIsBeginning(swiper.isBeginning)
        setIsEnd(swiper.isEnd)
      }}
    >
      {data.map((item, i) => (
        <SwiperSlide key={i} style={{ cursor: 'pointer' }}>
          {children(item, i)}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
