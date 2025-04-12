import { supabase } from 'app/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('files') as File

  if (!file) {
    return NextResponse.json({ success: false, error: 'Нет файла' }, { status: 400 })
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `uploads/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('dombankrot')
      .upload(filePath, buffer, {
        contentType: file.type
      })

    if (uploadError) throw uploadError

    const publicUrl = `https://fugimwfsmqeepaojaphc.supabase.co/storage/v1/object/public/dombankrot/${filePath}`

    return NextResponse.json({
      success: true,
      path: filePath,
      url: publicUrl
    })
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err?.message || String(err)
    })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { path } = await req.json()

    console.log('[DELETE IMAGE] path:', path)

    if (!path) {
      return NextResponse.json(
        { success: false, error: 'Путь к файлу не передан' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.storage.from('dombankrot').remove([path])

    console.log('[DELETE RESULT]', { data, error })

    if (error) throw error

    return NextResponse.json({ success: true, path })
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err?.message || String(err)
    })
  }
}
