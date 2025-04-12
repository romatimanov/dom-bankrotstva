import { supabase } from 'app/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  try {
    if (id) {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('id', Number(id))
        .single()
      if (error) throw error
      return NextResponse.json({ success: true, data })
    }

    const { data, error } = await supabase
      .from('reviews')
      .select('id, title, text, dataend, name, city, price, created_at')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, data })
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
      title = '',
      text = '',
      dataend = '',
      name = '',
      city = '',
      price = ''
    } = await req.json()

    if (!title || !text || !dataend || !name || !city || !price) {
      return NextResponse.json(
        { success: false, error: 'Все поля должны быть заполнены' },
        { status: 400 }
      )
    }

    const { error: insertError } = await supabase
      .from('reviews')
      .insert([{ title, text, dataend, name, city, price }])

    if (insertError) throw insertError

    return NextResponse.json({ success: true, message: 'Отзыв сохранен' })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: 'Ошибка при получении: ' + (error?.message || JSON.stringify(error))
    })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, text, dataend, name, city, price } = await req.json()

    if (!id) {
      return NextResponse.json({ success: false, error: 'Не указан ID' }, { status: 400 })
    }

    const updates: Record<string, any> = {}
    if (title) updates.title = title
    if (text) updates.text = text
    if (dataend) updates.dataend = dataend
    if (name) updates.name = name
    if (city) updates.city = city
    if (price) updates.price = price

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Нет данных для обновления' },
        { status: 400 }
      )
    }

    const { error } = await supabase.from('reviews').update(updates).eq('id', id)

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

    const { error } = await supabase.from('reviews').delete().eq('id', id)
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: 'Ошибка при получении: ' + (error?.message || JSON.stringify(error))
    })
  }
}
