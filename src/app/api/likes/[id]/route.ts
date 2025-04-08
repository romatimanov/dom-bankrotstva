// app/api/likes/[id]/route.ts
import { pool } from 'app/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ success: false, error: 'Отсутствует ID' }, { status: 400 })
  }

  try {
    const [rows]: any = await pool.execute('SELECT likes FROM articles WHERE id = ?', [id])

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Статья не найдена' }, { status: 404 })
    }

    const currentViews = rows[0].likes
    const newLikes = currentViews + 1

    await pool.execute('UPDATE articles SET likes = ? WHERE id = ?', [newLikes, id])

    return NextResponse.json({ success: true, views: newLikes })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка запроса: ' + String(error) },
      { status: 500 }
    )
  }
}
