// articles/route.ts
import { pool } from 'app/lib/db'
import { RowDataPacket } from 'mysql2'
import { NextResponse } from 'next/server'

interface Article extends RowDataPacket {
  id: number
  title: string
  slug: string
  content: string
  image_url: string
  likes: number
  views: number
  tags: string
  created_at: string
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title')
  const slug = searchParams.get('slug')
  const id = searchParams.get('id')

  try {
    const db = pool

    if (title) {
      const [articles] = await db.query<Article[]>('SELECT * FROM articles')
      const found = articles.find((article) => {
        let slugified = article.title.toLowerCase()
        slugified = slugified.replace(/[^a-zа-я0-9\s\-]+/gi, '')
        slugified = slugified.replace(/\s+/g, '-')
        return slugified === title
      })

      if (found) {
        return NextResponse.json({ success: true, data: found })
      }

      return NextResponse.json({ success: false, error: 'Статья не найдена по title' })
    }

    if (slug) {
      const [rows] = await db.query<Article[]>('SELECT * FROM articles WHERE slug = ?', [slug])
      if (rows.length > 0) {
        return NextResponse.json({ success: true, data: rows[0] })
      }
      return NextResponse.json({ success: false, error: 'Статья не найдена' })
    }

    if (id) {
      const [rows] = await db.query<Article[]>('SELECT * FROM articles WHERE id = ?', [Number(id)])
      if (rows.length > 0) {
        return NextResponse.json({ success: true, data: rows[0] })
      }
      return NextResponse.json({ success: false, error: 'Статья не найдена' })
    }

    const [articles] = await db.query<Article[]>(
      `SELECT id, title, slug, image_url, content, likes, views, tags, created_at
       FROM articles
       ORDER BY created_at DESC`
    )

    return NextResponse.json({ success: true, data: articles })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Ошибка при получении: ' + String(error) })
  }
}
