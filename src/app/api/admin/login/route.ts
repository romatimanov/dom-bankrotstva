import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { username, password } = await req.json()

  if (username === 'admin' && password === '1234') {
    const res = NextResponse.json({ success: true })

    res.cookies.set('is_admin', 'true', {
      path: '/',
      httpOnly: true,
      sameSite: 'lax'
    })

    return res
  }

  return NextResponse.json({ message: 'Неверный логин или пароль' }, { status: 401 })
}
