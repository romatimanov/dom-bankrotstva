import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import style from 'app/styles/modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ModalSuccess({ isOpen, onClose }: ModalProps) {
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  if (!mounted || !isOpen) return null

  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) return null

  return ReactDOM.createPortal(
    <div className={style.overlay} onClick={handleOverlayClick}>
      <div className={`${style.modal} ${style.modalSuccess}`} ref={modalRef}>
        <button className={style.close} onClick={onClose}>
          <img src="/close.webp" alt="close" />
        </button>
        <div className={style.contentSuccess}>
          <h2 className={`${style.title} ${style.titleSuccess}`}>Спасибо за заявку!</h2>
          <p className={style.text}>
            Ожидайте звонка нашего юриста в течение 3 минут с номера. Если Вы оставили заявку вне
            рабочее время, мы перезвоним Вам на следующий рабочий день.
          </p>
          <h4 className={style.phone}>+7 (920) 803 06 59</h4>
        </div>
        <span className={style.lineSuccess}></span>
        <span className={style.lineSuccess}></span>
        <span className={style.lineSuccess}></span>
      </div>
    </div>,
    modalRoot
  )
}
