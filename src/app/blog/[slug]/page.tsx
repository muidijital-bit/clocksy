import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { blogPosts } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Clocksy Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "Clocksy",
    },
  };

  const formatDateLong = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-[#fafaf7] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-[#908a7e] hover:text-[#181613] mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Tüm yazılar
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className="inline-block text-xs font-medium text-[#908a7e] bg-[#ebe9e2] px-2.5 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1
            className="text-3xl sm:text-4xl font-medium text-[#181613] mb-4 leading-snug"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[#908a7e]">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{formatDateLong(post.date)}</time>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={13} /> {post.readTime} dk okuma
            </span>
          </div>
        </div>

        {/* Cover placeholder */}
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100 border border-[#e6e3da] rounded-2xl h-52 mb-8 flex items-center justify-center">
          <p className="text-[#908a7e] font-medium">{post.category}</p>
        </div>

        {/* Content */}
        <article className="prose prose-stone max-w-none mb-12">
          {(post.content || post.excerpt).split("\n\n").filter(Boolean).map((para, i) => (
            <p key={i} className="text-[#5a5750] leading-relaxed mb-5 text-base">
              {para}
            </p>
          ))}
        </article>

        {/* Author card */}
        <div className="bg-white border border-[#e6e3da] rounded-2xl p-6 mb-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#ebe9e2] flex items-center justify-center flex-shrink-0">
            <span className="font-bold text-[#5a5750]">
              {post.author.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
          <div>
            <p className="font-semibold text-[#181613]">{post.author}</p>
            <p className="text-sm text-[#908a7e]">Clocksy Uzmanı</p>
          </div>
        </div>

        {/* Related posts */}
        <div>
          <h2
            className="text-xl font-bold text-[#181613] mb-5"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            İlgili yazılar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="bg-white border border-[#e6e3da] rounded-xl p-4 hover:shadow-sm transition-shadow"
              >
                <span className="text-xs text-[#908a7e]">{p.category}</span>
                <h3 className="font-semibold text-[#181613] text-sm mt-1 line-clamp-2">{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
