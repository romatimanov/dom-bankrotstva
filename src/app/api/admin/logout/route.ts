import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ success: true })

  res.cookies.set('is_admin', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'lax'
  })

  return res
}
