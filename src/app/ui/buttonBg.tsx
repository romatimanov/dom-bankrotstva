import style from 'app/styles/ui/buttonBg.module.css'

type Button = {
  onClick?: () => void
  styles?: string
  disabled?: boolean
  children: string
  type?: string
}

export function ButtonBg({ children, ...props }: Button) {
  return (
    <button
      onClick={props.onClick}
      className={`${style.button} ${props.styles ?? ''}`}
      disabled={props.disabled}
    >
      {children}
    </button>
  )
}
