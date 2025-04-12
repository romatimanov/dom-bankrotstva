import { supabase } from 'app/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  try {
    if (id) {
      const { data, error } = await supabase.from('team').select('*').eq('id', Number(id)).single()
      if (error) throw error
      return NextResponse.json({ success: true, data })
    }

    const { data, error } = await supabase
      .from('team')
      .select('id, image, name, position, text, created_at')
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
    const body = await req.json()
    const { image, name, position, text } = body

    if (!name?.trim() || !position?.trim() || !text?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Все обязательные поля должны быть заполнены' },
        { status: 400 }
      )
    }

    const { error: insertError } = await supabase.from('team').insert([
      {
        name: name.trim(),
        position: position.trim(),
        text: text.trim(),
        image: image?.trim() || null
      }
    ])

    if (insertError) throw insertError

    return NextResponse.json({ success: true, message: 'Сотрудник сохранен' })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Ошибка при сохранении: ' + (error?.message || JSON.stringify(error))
      },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, image, name, position, text } = await req.json()

    if (!id) {
      return NextResponse.json({ success: false, error: 'Не указан ID' }, { status: 400 })
    }

    const updates: Record<string, any> = {}
    if (image !== undefined) updates.image = image
    if (text) updates.text = text
    if (name) updates.name = name
    if (position) updates.position = position

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Нет данных для обновления' },
        { status: 400 }
      )
    }

    const { error } = await supabase.from('team').update(updates).eq('id', id)

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

    const { error } = await supabase.from('team').delete().eq('id', id)
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: 'Ошибка при получении: ' + (error?.message || JSON.stringify(error))
    })
  }
}
