// src/tools/generate-sitemap.js
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const baseUrl = 'https://axelbase.github.io/jwt-viz';
const outputDir = resolve(process.cwd(), 'docs');
const pages = [
	{ url: '', priority: '1.0', changefreq: 'weekly' },
	{ url: 'blog.html', priority: '0.9', changefreq: 'monthly' },
	{ url: 'blog/posts/post1.html', priority: '0.8', changefreq: 'yearly' },
	{ url: 'blog/posts/post2.html', priority: '0.8', changefreq: 'yearly' },
	{ url: 'blog/posts/post3.html', priority: '0.8', changefreq: 'yearly' },
	{ url: 'blog/posts/post4.html', priority: '0.8', changefreq: 'yearly' },
	{ url: 'blog/posts/post5.html', priority: '0.8', changefreq: 'yearly' },
	{ url: 'blog/posts/post6.html', priority: '0.8', changefreq: 'yearly' },
	{ url: 'blog/posts/post7.html', priority: '0.8', changefreq: 'yearly' },
	{ url: 'privacy.html', priority: '0.7', changefreq: 'yearly' },
	{ url: 'terms.html', priority: '0.7', changefreq: 'yearly' },
	{ url: '404.html', priority: '0.5', changefreq: 'yearly' }
];

const today = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		({ url, priority, changefreq }) => `  <url>
    <loc>${baseUrl}/${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`.trim();

const sitemapPath = resolve(outputDir, 'sitemap.xml');
writeFileSync(sitemapPath, sitemap + '\n', 'utf-8');

console.log(`Sitemap generated: ${sitemapPath}`);
