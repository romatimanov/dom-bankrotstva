import { Article } from 'app/interfaces/articles'
import { Post } from 'app/components/article/post'
import { Metadata } from 'next'
import { pool } from 'app/lib/db'

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  const [rows] = await pool.query<Article[]>(
    'SELECT title, metakey, metadescription FROM articles WHERE slug = ?',
    [decodedSlug]
  )

  if (rows.length === 0) {
    return {
      title: 'Статья не найдена',
      description: 'Информация по статье не найдена'
    }
  }

  const article = rows[0]

  return {
    title: article.title,
    description: article.metadescription,
    keywords: article.metakey,
    openGraph: {
      title: article.title,
      description: article.metadescription,
      images: ['/images/article-image.jpg']
    }
  }
}

export default async function NewsPage({
  params
}: {
  params: { slug: string } | Promise<{ slug: string }>
}) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  const db = pool

  const [rows] = await db.query<Article[]>('SELECT * FROM articles WHERE slug = ?', [decodedSlug])

  if (rows.length === 0) {
    return <h1>Статья не найдена по slug</h1>
  }

  const article = rows[0]

  return (
    <>
      <Post article={article} />
    </>
  )
}
