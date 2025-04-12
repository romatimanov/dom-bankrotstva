import { supabase } from 'app/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

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
    if (title) {
      const { data: posts, error } = await supabase.from('posts').select('*')
      if (error) throw error

      const found = posts.find((article) => {
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
      const { data, error } = await supabase.from('posts').select('*').eq('slug', slug)
      if (error) throw error
      if (data && data.length > 0) {
        return NextResponse.json({ success: true, data: data[0] })
      }
      return NextResponse.json({ success: false, error: 'Статья не найдена' })
    }

    if (id) {
      const { data, error } = await supabase.from('posts').select('*').eq('id', Number(id))
      if (error) throw error
      if (data && data.length > 0) {
        return NextResponse.json({ success: true, data: data[0] })
      }
      return NextResponse.json({ success: false, error: 'Статья не найдена' })
    }

    const { data: posts, error } = await supabase
      .from('posts')
      .select('id, title, slug, image_url, content, likes, views, tags, created_at')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, data: posts })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: 'Ошибка при получении: ' + (error?.message || JSON.stringify(error))
    })
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
      const { data, error } = await supabase.from('posts').select('id').eq('slug', slug)
      if (error) throw error
      if (!data || data.length === 0) break
      slug = `${baseSlug}-${suffix++}`
    }

    const { error: insertError } = await supabase
      .from('posts')
      .insert([{ title, content, image_url, tags, slug, metakey, metadescription }])

    if (insertError) throw insertError

    return NextResponse.json({ success: true, message: 'Статья сохранена', slug })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: 'Ошибка при получении: ' + (error?.message || JSON.stringify(error))
    })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, content, tags, image_url, metakey, metadescription } = await req.json()

    if (!id) {
      return NextResponse.json({ success: false, error: 'Не указан ID' }, { status: 400 })
    }

    const updates: Record<string, any> = {}
    if (title) {
      updates.title = title
      updates.slug = slugify(title)
    }
    if (content) updates.content = content
    if (tags) updates.tags = tags
    if (image_url !== undefined) updates.image_url = image_url
    if (metakey) updates.metakey = metakey
    if (metadescription) updates.metadescription = metadescription

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Нет данных для обновления' },
        { status: 400 }
      )
    }

    const { error } = await supabase.from('posts').update(updates).eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: 'Ошибка при получении: ' + (error?.message || JSON.stringify(error))
    })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID не передан' }, { status: 400 })
    }

    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: 'Ошибка при получении: ' + (error?.message || JSON.stringify(error))
    })
  }
}
