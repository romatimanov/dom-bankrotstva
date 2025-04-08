import { writeFile } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('files') as File

  if (!file || typeof file === 'string') {
    return NextResponse.json({ success: false, error: 'Файл не получен' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const fileName = `${Date.now()}-${file.name}`
  const filePath = path.join(process.cwd(), 'public/uploads', fileName)

  await writeFile(filePath, buffer)

  const fileUrl = `/uploads/${fileName}`

  return NextResponse.json({ success: true, url: fileUrl })
}
