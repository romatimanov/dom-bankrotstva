// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!
})

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('files') as File

  if (!file) {
    return NextResponse.json({ success: false, error: 'Нет файла' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const base64 = buffer.toString('base64')
  const dataURI = `data:${file.type};base64,${base64}`

  try {
    const res = await cloudinary.v2.uploader.upload(dataURI, {
      folder: 'your-folder'
    })

    return NextResponse.json({ success: true, url: res.secure_url })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) })
  }
}
