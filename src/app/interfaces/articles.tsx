import { RowDataPacket } from 'mysql2'

export interface Article extends RowDataPacket {
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
