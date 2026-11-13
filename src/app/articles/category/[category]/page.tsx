import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { Reveal } from "@/components/reveal";
import { categorySlug, getArticleCategories, getSortedArticles } from "@/lib/articles";
import { site } from "@/lib/site";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  const categories = await getArticleCategories();
  return categories.map((category) => ({ category: categorySlug(category) }));
}

async function getCategory(slug: string) {
  const categories = await getArticleCategories();
  return categories.find((category) => categorySlug(category) === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: "Category not found" };
  return {
    title: `${category} articles`,
    description: `Articles about ${category}, written by ${site.author.name}.`,
    alternates: { canonical: `/articles/category/${slug}` },
  };
}

export default async function ArticleCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const articles = (await getSortedArticles()).filter((article) =>
    article.tags.includes(category)
  );

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:pt-24">
      <Reveal>
        <Link href="/articles" className="text-sm font-medium text-accent hover:underline">
          ← All articles
        </Link>
        <p className="mt-8 text-sm font-medium uppercase tracking-[0.14em] text-accent">Category</p>
        <h1 className="mt-2 text-[36px] font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-[44px]">
          {category}
        </h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
          {articles.length} {articles.length === 1 ? "article" : "articles"} in this category.
        </p>
        <p className="mt-3 text-sm text-muted">
          Written by <Link href="/about" className="font-medium text-accent underline-offset-4 hover:underline">me</Link>.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <Reveal key={article.slug} delay={index * 80}>
            <ArticleCard article={article} />
          </Reveal>
        ))}
      </div>
    </main>
  );
}
