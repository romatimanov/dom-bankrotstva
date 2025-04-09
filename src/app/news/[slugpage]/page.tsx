import { pool } from 'app/lib/db'
import { Article } from 'app/interfaces/articles'
import { Post } from 'app/components/article/post'
import { Metadata } from 'next'

export async function generateMetadata({
  params
}: {
  params: Promise<{ slugpage: string }>
}): Promise<Metadata> {
  const { slugpage } = await params
  const decodedSlug = decodeURIComponent(slugpage)

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
      images: ['https://dombankrot.com/logo.webp']
    }
  }
}

export default async function NewsPage({ params }: { params: Promise<{ slugpage: string }> }) {
  const { slugpage } = await params
  const decodedSlug = decodeURIComponent(slugpage)

  const [rows] = await pool.query<Article[]>('SELECT * FROM articles WHERE slug = ?', [decodedSlug])

  if (rows.length === 0) {
    return <h1 className="not-found">Статья не найдена :(</h1>
  }

  const article = rows[0]

  return <Post article={article} />
}
