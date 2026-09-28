import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";

const base = process.argv[2] || "http://localhost:3107";
const canonicalBase = "https://www.belis.agency";
const results = [];
let requests = 0;

async function get(route, status = 200) {
  const response = await fetch(`${base}${route}`, { signal: AbortSignal.timeout(15000) });
  requests += 1;
  assert.equal(response.status, status, `${route}: HTTP status`);
  return response;
}

async function documentFor(route) {
  const response = await get(route);
  assert.match(response.headers.get("content-type") || "", /text\/html/);
  return new JSDOM(await response.text(), { url: `${base}${route}` });
}

function checkMetadata(document, route) {
  assert.equal(document.querySelectorAll("h1").length, 1, `${route}: one H1`);
  assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute("href"), `${canonicalBase}${route}`, `${route}: canonical`);
  assert.equal(document.querySelector('meta[property="og:url"]')?.getAttribute("content"), `${canonicalBase}${route}`, `${route}: Open Graph URL`);
  assert.equal(document.querySelector('meta[name="robots"]')?.getAttribute("content")?.includes("noindex"), false, `${route}: indexable`);
}

function graph(document) {
  return [...document.querySelectorAll('script[type="application/ld+json"]')]
    .flatMap(script => {
      const data = JSON.parse(script.textContent);
      return data["@graph"] || [data];
    });
}

const index = await documentFor("/blog");
checkMetadata(index.window.document, "/blog");
const postPaths = [...new Set([...index.window.document.querySelectorAll('a[href^="/blog/"]')]
  .map(link => link.getAttribute("href"))
  .filter(href => /^\/blog\/[a-z0-9-]+$/.test(href) && href !== "/blog/politica-editorial"))];
assert.equal(postPaths.length, 6, "Six posts present in server-rendered catalog");
assert.equal(index.window.document.querySelectorAll('input[type="search"]').length, 1);
results.push({ route: "/blog", status: "pass", postsInInitialHtml: postPaths.length });
index.window.close();

for (const theme of ["audiovisual", "sites", "sistemas"]) {
  const route = `/blog/temas/${theme}`;
  const page = await documentFor(route);
  checkMetadata(page.window.document, route);
  const collection = graph(page.window.document).find(item => item["@type"] === "CollectionPage");
  assert.ok(collection, `${route}: CollectionPage`);
  const itemList = collection.mainEntity;
  assert.equal(itemList?.itemListElement?.length, 2, `${route}: two posts`);
  results.push({ route, status: "pass", posts: 2 });
  page.window.close();
}

for (const route of postPaths) {
  const page = await documentFor(route);
  const { document } = page.window;
  checkMetadata(document, route);
  const data = graph(document);
  const article = data.find(item => item["@type"] === "BlogPosting");
  const faq = data.find(item => item["@type"] === "FAQPage");
  const breadcrumbs = data.find(item => item["@type"] === "BreadcrumbList");
  assert.ok(article && faq && breadcrumbs, `${route}: complete schema graph`);
  assert.equal(article.headline, document.querySelector("h1").textContent);
  assert.equal(article.url, `${canonicalBase}${route}`);
  assert.ok(article.wordCount >= 700, `${route}: editorial quality gate`);
  assert.equal(article.author["@type"], "Organization");
  assert.equal(article.author.name, "Belis Agency");
  assert.equal(article.author["@id"], `${canonicalBase}/#organization`);
  assert.equal(article.datePublished.slice(0, 10), document.querySelector("time").getAttribute("datetime"));
  assert.equal(document.querySelector('meta[property="article:published_time"]')?.getAttribute("content"), article.datePublished);
  assert.equal(document.querySelector('meta[property="article:modified_time"]')?.getAttribute("content"), article.dateModified);
  const visibleFaq = [...document.querySelectorAll("#perguntas-frequentes details")].map(item => ({
    question: item.querySelector("summary").textContent,
    answer: item.querySelector("p").textContent,
  }));
  assert.deepEqual(faq.mainEntity.map(item => ({ question: item.name, answer: item.acceptedAnswer.text })), visibleFaq, `${route}: FAQ parity`);
  const visibleBreadcrumbs = [...document.querySelector('[aria-label="Caminho do artigo"]').querySelectorAll("li")].map(item => item.textContent);
  assert.deepEqual(breadcrumbs.itemListElement.map(item => item.name), visibleBreadcrumbs, `${route}: breadcrumb parity`);
  const cover = document.querySelector('img[src$="/capa"]');
  const imageUrl = `${canonicalBase}${route}/capa`;
  assert.equal(article.image.url, imageUrl);
  assert.equal(document.querySelector('meta[property="og:image"]')?.getAttribute("content"), imageUrl);
  assert.equal(document.querySelector('meta[name="twitter:image"]')?.getAttribute("content"), imageUrl);
  assert.equal(cover?.getAttribute("alt"), article.image.caption);
  for (const anchor of document.querySelectorAll('[aria-label="Índice do artigo"] a')) {
    assert.ok(document.getElementById(anchor.getAttribute("href").slice(1)), `${route}: valid table of contents target`);
  }
  for (const source of article.citation) assert.ok([...document.querySelectorAll("#fontes a")].some(link => link.href === source), `${route}: visible citation`);
  const ctas = [...document.querySelectorAll("a[data-blog-cta]")];
  assert.deepEqual(ctas.map(link => link.getAttribute("data-blog-cta")).sort(), ["bottom", "middle", "sidebar", "top"]);
  for (const link of ctas) {
    const href = new URL(link.href);
    assert.equal(href.origin + href.pathname, "https://wa.me/5511973138895");
    assert.ok(href.searchParams.get("text").includes(`Origem: ${canonicalBase}${route}`));
  }
  const png = await get(`${route}/capa`);
  assert.match(png.headers.get("content-type") || "", /image\/png/);
  const bytes = Buffer.from(await png.arrayBuffer());
  assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(bytes.readUInt32BE(16), 1200);
  assert.equal(bytes.readUInt32BE(20), 630);
  const download = await get(`${route}/checklist`);
  assert.match(download.headers.get("content-disposition") || "", /^attachment; filename="[a-z0-9-]+\.txt"$/);
  assert.match(download.headers.get("content-type") || "", /text\/plain; charset=utf-8/);
  assert.equal(download.headers.get("x-robots-tag"), "noindex");
  const downloadBytes = Buffer.from(await download.arrayBuffer());
  assert.equal(downloadBytes.subarray(0, 3).toString("hex"), "efbbbf");
  assert.ok(downloadBytes.toString("utf8").includes(`${canonicalBase}${route}`));
  assert.ok(downloadBytes.toString("utf8").includes("____________________________________________________________"));
  results.push({ route, status: "pass", words: article.wordCount, faq: visibleFaq.length, cover: "1200x630 PNG", checklist: "UTF-8 BOM" });
  page.window.close();
}

const rssResponse = await get("/blog/feed.xml");
const rss = new JSDOM(await rssResponse.text(), { contentType: "text/xml" });
assert.equal(rss.window.document.querySelectorAll("parsererror").length, 0);
assert.equal(rss.window.document.querySelectorAll("item").length, postPaths.length);
assert.deepEqual([...rss.window.document.querySelectorAll("item > link")].map(item => item.textContent).sort(), postPaths.map(route => `${canonicalBase}${route}`).sort());
rss.window.close();
results.push({ route: "/blog/feed.xml", status: "pass", items: postPaths.length });

const sitemapResponse = await get("/sitemap.xml");
const sitemap = new JSDOM(await sitemapResponse.text(), { contentType: "text/xml" });
const sitemapUrls = [...sitemap.window.document.querySelectorAll("loc")].map(item => item.textContent);
for (const route of ["/blog", ...postPaths, "/blog/temas/audiovisual", "/blog/temas/sites", "/blog/temas/sistemas", "/blog/politica-editorial"]) assert.ok(sitemapUrls.includes(`${canonicalBase}${route}`), `Sitemap includes ${route}`);
assert.ok(sitemapUrls.every(url => url.startsWith(canonicalBase)));
assert.ok(sitemapUrls.every(url => !/\/(capa|checklist)$/.test(url)));
sitemap.window.close();
results.push({ route: "/sitemap.xml", status: "pass", urls: sitemapUrls.length });

const policy = await documentFor("/blog/politica-editorial");
checkMetadata(policy.window.document, "/blog/politica-editorial");
policy.window.close();
results.push({ route: "/blog/politica-editorial", status: "pass" });
for (const route of ["/blog/artigo-inexistente", "/blog/temas/tema-inexistente", "/blog/artigo-inexistente/capa", "/blog/artigo-inexistente/checklist"]) {
  await get(route, 404);
  results.push({ route, status: "pass", expectedHttp: 404 });
}
const robots = await get("/robots.txt");
assert.ok((await robots.text()).includes(`Sitemap: ${canonicalBase}/sitemap.xml`));
const report = { verifiedAt: new Date().toISOString(), base, requests, results, limitations: ["Local production build only; no deployment or indexing verified.", "HTTP checks do not replace interactive browser checks or actual GA4 receipt verification."] };
const output = path.resolve("output/blog-qa/http-report.json");
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Blog HTTP checks passed: ${requests} requests; ${postPaths.length} posts; 3 themes; schema/metadata/FAQ/images/downloads/feed/sitemap/404. Report: ${output}`);
