// src/app/api/articles/route.ts
import { pool } from 'app/lib/db'
import { RowDataPacket, ResultSetHeader } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

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

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^Ѐ-ӿ\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
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

export async function POST(req: NextRequest) {
  try {
    const {
      title,
      content,
      tags,
      image_url = '',
      metakey = '',
      metadescription = ''
    } = await req.json()

    console.log('API received image_url:', image_url)

    if (!title || !content || !tags) {
      return NextResponse.json(
        { success: false, error: 'Заголовок, текст и теги обязательны' },
        { status: 400 }
      )
    }

    const baseSlug = slugify(title)
    let slug = baseSlug
    let suffix = 1

    while (true) {
      const [rows] = await pool.query('SELECT COUNT(*) AS count FROM articles WHERE slug = ?', [
        slug
      ])
      const count = (rows as RowDataPacket[])[0].count
      if (count === 0) break
      slug = `${baseSlug}-${suffix++}`
    }

    await pool.query(
      'INSERT INTO articles (title, content, image_url, tags, slug, metakey, metadescription) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, content, image_url, tags, slug, metakey, metadescription]
    )

    return NextResponse.json({ success: true, message: 'Статья сохранена', slug })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Ошибка при сохранении: ' + String(error) })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, content, tags, image_url, metakey, metadescription } = await req.json()

    if (!id) {
      return NextResponse.json({ success: false, error: 'Не указан ID' }, { status: 400 })
    }

    const updatedFields: string[] = []
    const updatedValues: any[] = []

    let slug: string | undefined

    if (title) {
      slug = slugify(title)
      updatedFields.push('title = ?', 'slug = ?')
      updatedValues.push(title, slug)
    }

    if (content) {
      updatedFields.push('content = ?')
      updatedValues.push(content)
    }

    if (tags) {
      updatedFields.push('tags = ?')
      updatedValues.push(tags)
    }

    if (image_url) {
      updatedFields.push('image_url = ?')
      updatedValues.push(image_url)
    }

    if (metakey) {
      updatedFields.push('metakey = ?')
      updatedValues.push(metakey)
    }

    if (metadescription) {
      updatedFields.push('metadescription = ?')
      updatedValues.push(metadescription)
    }

    if (updatedFields.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Нет данных для обновления' },
        { status: 400 }
      )
    }

    const setClause = updatedFields.join(', ')

    updatedValues.push(id)

    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE articles SET ${setClause} WHERE id = ?`,
      updatedValues
    )

    if (result.affectedRows === 0) {
      return NextResponse.json({ success: false, error: 'Статья не найдена' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Ошибка при обновлении: ' + String(error) })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID не передан' }, { status: 400 })
    }

    await pool.query('DELETE FROM articles WHERE id = ?', [Number(id)])
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Ошибка при удалении: ' + String(error) })
  }
}
