import { pool } from 'app/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ success: false, error: 'Отсутствует ID' }, { status: 400 })
    }

    const [rows]: any = await pool.execute('SELECT views FROM articles WHERE id = ?', [id])

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Статья не найдена' }, { status: 404 })
    }

    const currentViews = rows[0].views
    const newViews = currentViews + 1

    await pool.execute('UPDATE articles SET views = ? WHERE id = ?', [newViews, id])

    return NextResponse.json({ success: true, views: newViews })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка запроса: ' + String(error) },
      { status: 500 }
    )
  }
}
