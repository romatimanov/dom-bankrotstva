import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import style from 'app/styles/modal.module.css'
import { Button } from 'app/ui/button'
import { ButtonBg } from 'app/ui/buttonBg'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  text?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export default function ModalAdmin({ isOpen, onClose, text, onConfirm, onCancel }: ModalProps) {
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
      <div className={style.modal} ref={modalRef}>
        <button className={style.close} onClick={onClose}>
          <img src="/close.webp" alt="close" />
        </button>
        <div className={style.content}>
          <p className={style.textAdmin}>{text}</p>
          <div className={style.buttons}>
            <Button styles={style.success} onClick={onConfirm}>
              Да
            </Button>
            <ButtonBg onClick={onCancel}>Нет</ButtonBg>
          </div>
        </div>
        <span className={style.line}></span>
        <span className={style.line}></span>
        <span className={style.line}></span>
      </div>
    </div>,
    modalRoot
  )
}
