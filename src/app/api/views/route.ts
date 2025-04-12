import { supabase } from 'app/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ success: false, error: 'Отсутствует ID' }, { status: 400 })
    }

    // Получаем текущее количество просмотров
    const { data, error: fetchError } = await supabase
      .from('posts')
      .select('views')
      .eq('id', id)
      .single()

    if (fetchError) {
      return NextResponse.json(
        { success: false, error: 'Ошибка получения: ' + fetchError.message },
        { status: 500 }
      )
    }

    const currentViews = data?.views || 0
    const newViews = currentViews + 1

    // Обновляем количество просмотров
    const { error: updateError } = await supabase
      .from('posts')
      .update({ views: newViews })
      .eq('id', id)

    if (updateError) {
      return NextResponse.json(
        { success: false, error: 'Ошибка обновления: ' + updateError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, views: newViews })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Ошибка запроса: ' + (error?.message || JSON.stringify(error)) },
      { status: 500 }
    )
  }
}
