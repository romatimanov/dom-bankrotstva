import { Metadata } from 'next'
import { pool } from 'app/lib/db'
import { Article } from 'app/interfaces/articles'
import { Post } from 'app/components/article/post'

type PageProps = {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug)

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

export default async function NewsPage({ params }: PageProps) {
  const decodedSlug = decodeURIComponent(params.slug)

  const [rows] = await pool.query<Article[]>('SELECT * FROM articles WHERE slug = ?', [decodedSlug])

  if (rows.length === 0) {
    return <h1>Статья не найдена по slug</h1>
  }

  const article = rows[0]

  return <Post article={article} />
}
