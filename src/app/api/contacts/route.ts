import { supabase } from 'app/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  try {
    if (id) {
      const { data, error } = await supabase.from('contacts').select('*').eq('id', Number(id))
      if (error) throw error
      if (data && data.length > 0) {
        return NextResponse.json({ success: true, data: data[0] })
      }
      return NextResponse.json({ success: false, error: 'Контакт не найден' })
    }

    const { data: contacts, error } = await supabase
      .from('contacts')
      .select(
        'id, phone, mail, partners, tgChannel, tgCall, address_name, address, branch, created_at'
      )
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, data: contacts })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: 'Ошибка при получении: ' + (error?.message || JSON.stringify(error))
    })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, phone, mail, partners, tgChannel, tgCall, address_name, address, branch } =
      await req.json()

    if (!id) {
      return NextResponse.json({ success: false, error: 'Не указан ID' }, { status: 400 })
    }

    const updates: Record<string, any> = {}
    if (phone) updates.phone = phone
    if (mail) updates.mail = mail
    if (partners) updates.partners = partners
    if (tgChannel) updates.tgChannel = tgChannel
    if (tgCall) updates.tgCall = tgCall
    if (address_name) updates.address_name = address_name
    if (address) updates.address = address
    if (branch) updates.branch = branch
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Нет данных для обновления' },
        { status: 400 }
      )
    }

    const { error } = await supabase.from('contacts').update(updates).eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: 'Ошибка при получении: ' + (error?.message || JSON.stringify(error))
    })
  }
}
