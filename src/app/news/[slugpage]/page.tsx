import { supabase } from 'app/lib/supabaseClient'
import { Article } from 'app/interfaces/articles'
import { Post } from 'app/components/article/post'
import { Metadata } from 'next'

export async function generateMetadata({
  params
}: {
  params: { slugpage: string }
}): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slugpage)

  const { data, error } = await supabase
    .from('posts')
    .select('title, metakey, metadescription')
    .eq('slug', decodedSlug)
    .single()

  if (error || !data) {
    return {
      title: 'Статья не найдена',
      description: 'Информация по статье не найдена'
    }
  }

  return {
    title: data.title,
    description: data.metadescription,
    keywords: data.metakey,
    openGraph: {
      title: data.title,
      description: data.metadescription,
      images: ['https://dombankrot.com/logo.webp']
    }
  }
}

export default async function NewsPage({ params }: { params: { slugpage: string } }) {
  const decodedSlug = decodeURIComponent(params.slugpage)

  const { data, error } = await supabase.from('posts').select('*').eq('slug', decodedSlug).single()

  if (error || !data) {
    return <h1 className="not-found">Статья не найдена :(</h1>
  }

  return <Post article={data as Article} />
}
