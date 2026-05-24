import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog | Clocksy",
  description:
    "Saç bakımı, sakal modelleri ve kuaförlik dünyasına dair güncel yazılar. Clocksy Blog.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  const categories = Array.from(new Set(blogPosts.map((p) => p.category)));

  return (
    <div className="bg-[#fafaf7] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10">
          <p className="text-sm text-[#908a7e] mb-2">Blog</p>
          <h1
            className="text-4xl sm:text-5xl font-medium text-[#181613] mb-4"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            kuaförlik Dünyası
          </h1>
          <p className="text-[#5a5750] text-lg">Uzmanlarımızdan saç bakım ipuçları ve güncel haberler.</p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button className="px-3 py-1.5 rounded-full text-sm font-medium bg-[#181613] text-[#fafaf7]">
            Tümü
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-white border border-[#e6e3da] text-[#5a5750] hover:border-[#d3cfc2] transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group block bg-white border border-[#e6e3da] rounded-2xl overflow-hidden hover:shadow-md transition-shadow mb-8"
        >
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100 h-48 sm:h-64 flex items-center justify-center">
            <div className="text-center px-6">
              <span className="inline-block text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mb-3">
                {featured.category}
              </span>
              <p className="text-[#5a5750] font-medium">Öne Çıkan Yazı</p>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <h2
              className="text-2xl sm:text-3xl font-medium text-[#181613] mb-3 group-hover:text-[#2a2520]"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              {featured.title}
            </h2>
            <p className="text-[#5a5750] mb-5 leading-relaxed">{featured.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-[#908a7e]">
                <span>{featured.author}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} /> {featured.readTime} dk okuma
                </span>
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-[#181613]">
                Oku <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </Link>

        {/* Rest of posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-[#e6e3da] rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <span className="inline-block text-xs font-medium text-[#908a7e] bg-[#f4f3ee] px-2 py-0.5 rounded-full mb-3">
                {post.category}
              </span>
              <h2
                className="font-bold text-[#181613] text-lg mb-2 group-hover:text-[#2a2520]"
                style={{ fontFamily: "var(--font-fraunces), serif" }}
              >
                {post.title}
              </h2>
              <p className="text-sm text-[#5a5750] leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-[#908a7e]">
                <span>{post.author}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {post.readTime} dk
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
