import { pool } from 'app/lib/db'

export async function fetchPostBySlug(slug: string) {
  let db

  try {
    db = pool

    const [rows] = await db.execute('SELECT * FROM articles WHERE slug = ?', [slug])

    if (Array.isArray(rows) && rows.length > 0) {
      return rows[0]
    }

    return null
  } catch (error) {
    console.error('Database error: ', error)
    return { error: 'Database error: ' + error }
  } finally {
    if (db && typeof db.end === 'function') {
      await db.end()
    }
  }
}
