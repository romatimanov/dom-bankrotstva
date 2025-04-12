import { supabase } from 'app/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { id } = await req.json()

  if (!id) {
    return NextResponse.json({ success: false, error: 'ID не передан' }, { status: 400 })
  }

  try {
    const { data, error: fetchError } = await supabase
      .from('posts')
      .select('likes')
      .eq('id', id)
      .single()

    if (fetchError) {
      return NextResponse.json(
        { success: false, error: 'Ошибка получения: ' + fetchError.message },
        { status: 500 }
      )
    }

    const currentLikes = data?.likes || 0
    const newLikes = currentLikes + 1

    const { error: updateError } = await supabase
      .from('posts')
      .update({ likes: newLikes })
      .eq('id', id)

    if (updateError) {
      return NextResponse.json(
        { success: false, error: 'Ошибка обновления: ' + updateError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, likes: newLikes })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Ошибка запроса: ' + (error?.message || JSON.stringify(error)) },
      { status: 500 }
    )
  }
}
