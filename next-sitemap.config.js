/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://dombankrot.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  outDir: './public',
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      }
    ],
    additionalSitemaps: ['https://dombankrot.com/sitemap.xml']
  }
}
