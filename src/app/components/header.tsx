'use client'

import { Button } from '../ui/button'
import style from '../styles/header.module.css'
import { useResize } from 'app/hook/useResize'
import { useEffect, useState } from 'react'
import Modal from './modal'
import ModalSuccess from './modalSuccess'
import { useRouter } from 'next/navigation'

export function Header() {
  const [burger, setBurger] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [isOpenFormModal, setIsOpenFormModal] = useState(false)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)
  const router = useRouter()
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsSticky(window.scrollY > 100)
  //   }

  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  const handleBurger = () => setBurger(!burger)
  const resize = useResize(768)

  useEffect(() => {
    if (!resize) {
      setBurger(false)
    }
  }, [resize])

  useEffect(() => {
    if (burger) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
  }, [burger])

  const handleClick = () => {
    setBurger(false)
    setIsOpenFormModal(true)
  }

  if (resize === null) return null

  return (
    <header
      className={`container ${style.headerWrapper} ${isSticky ? style.sticky : ''}`}
      style={!burger ? { overflow: 'hidden' } : {}}
    >
      <div className={`${style.header}`}>
        <div className={style.logo} onClick={() => router.push('/')}>
          <img src="/logo.png" alt="" />
        </div>
        {!resize && (
          <nav className={style.nav}>
            <ul className={style.list}>
              <li className={style.item} onClick={() => router.push('/about')}>
                О компании
              </li>
              <li className={style.item} onClick={() => router.push('/news')}>
                Новости
              </li>
              <li className={style.item}>Контакты</li>
            </ul>
          </nav>
        )}
        {!resize ? (
          <div className={style.contact}>
            <div className={style.phone}>
              <a href="tel:88007000399" className={style.number}>
                8-800-700-03-99
              </a>
              <button className={style.text} onClick={() => setIsOpenFormModal(true)}>
                Заказать обратный звонок
              </button>
            </div>
            <Button onClick={() => setIsOpenFormModal(true)}>Получить консультацию</Button>
          </div>
        ) : (
          <div className={style.mobileMenu}>
            <a href="tel:88007000399" className={style.number}>
              <img src="/phone.png" alt="phone" />
            </a>
            <button className={`${style.burger} ${burger && style.open}`} onClick={handleBurger}>
              <div className={style.mobileMenuLine}></div>
              <div className={style.mobileMenuLine}></div>
              <div className={style.mobileMenuLine}></div>
            </button>
          </div>
        )}
      </div>
      <div className={`${style.menu} ${burger ? style.open : ''}`}>
        <Button styles={style.menuBtn} onClick={() => router.push('/about')}>
          О компании
        </Button>
        <Button styles={style.menuBtn} onClick={() => router.push('/news')}>
          Новости
        </Button>
        <Button styles={style.menuBtn}>Контакты</Button>
        <Button onClick={handleClick}>Получить консультацию</Button>
      </div>
      <Modal
        isOpen={isOpenFormModal}
        onClose={() => setIsOpenFormModal(false)}
        onSuccess={() => {
          setIsOpenFormModal(false)
          setIsOpenSuccessModal(true)
        }}
      />

      <ModalSuccess isOpen={isOpenSuccessModal} onClose={() => setIsOpenSuccessModal(false)} />
    </header>
  )
}
