import style from 'app/styles/ui/button.module.css'
import Link from 'next/link'

type Button = {
  styles?: string
  children: string
  href: string
  onClick?: () => void
}

export function CustomLink({ children, ...props }: Button) {
  return (
    <Link
      href={props.href}
      className={`${style.button} ${props.styles ?? ''}`}
      onClick={props.onClick}
    >
      {children}
    </Link>
  )
}
