'use client'

import { useState } from 'react'
import style from 'app/styles/map.module.css'

export function Map() {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className={style.map}>
      <a
        href="https://yandex.ru/maps/?text=ТЦ%20Дежнёв%20Плаза%20Москва%20проезд%20Дежнёва%201"
        className={style.mapLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/icon/location.svg" alt="location" className={style.mapIcon} />
        <span className={style.mapText}>Посмотреть на карте</span>
      </a>

      <div
        className={`${style.mapBlock} ${isActive ? style.active : ''}`}
        onClick={() => setIsActive(true)}
      >
        <iframe
          src="https://yandex.com/map-widget/v1/?filter=alternate_vertical%3AWhatWhere&ll=37.653758%2C55.871174&mode=search&oid=1074219961&ol=biz&sctx=ZAAAAAgCEAAaKAoSCfFmDd5XtSVAEXmxMEROl0hAEhIJ9N4YAoCWVkARDvj8MEIcQ0AiBgABAgMEBSgKOABAtpIHSAFqAnJ1nQHNzMw9oAEAqAEAvQHeVp49wgEFuZedgASCAm7QotCmIOKAnNCU0LXQttC90LXQsiDQn9C70LDQt9Cw4oCdIDEyNzA4MSwg0LPQvtGA0L7QtCDQnNC%2B0YHQutCy0LAsINC%2F0YAt0LQg0JTQtdC20L3RkdCy0LAsINC0LiAxLCDQvtGE0LjRgSAzMooCAJICAzIxM5oCDGRlc2t0b3AtbWFwcw%3D%3D&sll=37.653758%2C55.871174&sspn=0.034374%2C0.012408&text=%D0%A2%D0%A6%20%E2%80%9C%D0%94%D0%B5%D0%B6%D0%BD%D0%B5%D0%B2%20%D0%9F%D0%BB%D0%B0%D0%B7%D0%B0%E2%80%9D%20127081%2C%20%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%BF%D1%80-%D0%B4%20%D0%94%D0%B5%D0%B6%D0%BD%D1%91%D0%B2%D0%B0%2C%20%D0%B4.%201%2C%20%D0%BE%D1%84%D0%B8%D1%81%2032&z=15.36"
          width="100%"
          height="300"
          allowFullScreen
          className={style.mapIframe}
        />
      </div>
    </div>
  )
}
