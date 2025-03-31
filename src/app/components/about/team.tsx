import style from 'app/styles/about.module.css'
import { SwiperComponent } from '../swiper'
import { TeamCard } from 'app/ui/teamCard'
import { useRef } from 'react'

const team = [
  {
    img: '/team1.png',
    name: 'Анна Сергеевна Ковалева',
    position: 'Старший юрист',
    text: 'Специализируется на сопровождении процедур банкротства физических лиц'
  },
  {
    img: 'team2.png',
    name: 'Елена Викторовна Белова',
    position: 'Юрист-арбитражник',
    text: 'Представляет клиентов в арбитражных судах и оспаривает решения финансовых управляющих.'
  },
  {
    img: 'team3.png',
    name: 'Владимир Николаевич Семенов',
    position: 'Партнер компании, эксперт по банкротству',
    text: 'Специализируется в сфере банкротства, трудовых и налоговых спорах'
  },
  {
    img: 'team2.png',
    name: 'Елена Викторовна Белова',
    position: 'Юрист-арбитражник',
    text: 'Представляет клиентов в арбитражных судах и оспаривает решения финансовых управляющих.'
  },
  {
    img: 'team3.png',
    name: 'Владимир Николаевич Семенов',
    position: 'Партнер компании, эксперт по банкротству',
    text: 'Специализируется в сфере банкротства, трудовых и налоговых спорах'
  }
]

export function Team() {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
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
              data={team}
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
