import style from 'app/styles/ui/button.module.css'

type Button = {
  onClick?: () => void
  styles?: string
  disabled?: boolean
  children: string
}

export function Button({ children, ...props }: Button) {
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
