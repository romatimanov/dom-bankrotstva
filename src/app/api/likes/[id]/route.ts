import { pool } from 'app/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const id = body.id

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { success: false, error: 'Отсутствует или неверный ID' },
      { status: 400 }
    )
  }

  try {
    const [rows]: any = await pool.execute('SELECT likes FROM articles WHERE id = ?', [id])

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Статья не найдена' }, { status: 404 })
    }

    const currentLikes = rows[0].likes
    const newLikes = currentLikes + 1

    await pool.execute('UPDATE articles SET likes = ? WHERE id = ?', [newLikes, id])

    return NextResponse.json({ success: true, likes: newLikes })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка запроса: ' + String(error) },
      { status: 500 }
    )
  }
}
